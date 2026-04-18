require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();

const getPublicIdFromUrl = (url) => {
    try {
        const pathParts = url.split('/upload/')[1];
        if (!pathParts) return null;
        const publicIdWithExt = pathParts.split('.').slice(0, -1).join('.');
        return publicIdWithExt; // contoh: 'portfolio-zaka/abcdef'
    } catch (err) {
        console.error('Gagal mengekstrak public_id:', err);
        return null;
    }
};

// === CONFIG CLOUDINARY ===
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// === CONFIG MIDDLEWARE ===
app.use(cors());
app.use(express.json());

// === MONGODB CONNECTION ===
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Terhubung ke MongoDB Atlas'))
    .catch((err) => console.error('❌ Gagal terhubung ke MongoDB:', err));

// === MULTER MEMORY STORAGE ===
const storage = multer.memoryStorage();
const upload = multer({ storage });

// === MONGOOSE SCHEMA ===
const mediaSchema = new mongoose.Schema({
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true },
});

const documentationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['Event', 'Trip', 'Meet & Greet'], 
        required: true 
    },
    client: { type: String },
    eventDate: { type: Date },
    location: { type: String },
    description: { type: String },
    thumbnail: { type: String, required: true },
    media: [mediaSchema],
});

const Documentation = mongoose.model('Documentation', documentationSchema);

// === AUTH MIDDLEWARE ===
const protectRoute = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    if (password === process.env.ADMIN_PASSWORD) return next();
    res.status(403).json({ message: 'Akses Ditolak: Kata sandi admin salah.' });
};

// === UPLOAD ENDPOINT ===
app.post('/api/upload', protectRoute, upload.array('files', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Tidak ada file yang di-upload.' });
        }

        // Cloudinary upload
        const uploads = await Promise.all(
            req.files.map(
                (file) =>
                    new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                resource_type: "auto", // auto detect image/video
                                folder: "portfolio-zaka",
                                use_filename: true,
                                unique_filename: true,
                                overwrite: false,
                            },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );
                        uploadStream.end(file.buffer);
                    })
            )
        );

        // Deteksi jenis file berdasarkan format Cloudinary
        const videoFormats = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
        const media = uploads.map((u) => ({
            url: u.secure_url,
            type: videoFormats.includes((u.format || '').toLowerCase()) ? 'video' : 'image',
        }));

        return res.status(201).json({ media }); // Kembalikan array media
    } catch (error) {
        console.error('❌ Error saat upload:', error);
        res.status(500).json({ message: 'Gagal meng-upload file ke Cloudinary.' });
    }
});

// === CRUD ENDPOINTS ===

// Get all documentations
app.get('/api/documentations', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0;
        const docs = await Documentation.find()
        .sort({ _id: -1 })
        .limit(limit);
        res.json(docs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one documentation
app.get('/api/documentations/:id', async (req, res) => {
    try {
        const doc = await Documentation.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Dokumentasi tidak ditemukan' });
        res.json(doc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new documentation
app.post('/api/documentations', protectRoute, async (req, res) => {
    try {
        const newDoc = new Documentation(req.body);
        const saved = await newDoc.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update documentation
app.put('/api/documentations/:id', protectRoute, async (req, res) => {
    try {
        const updated = await Documentation.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete documentation
app.delete('/api/documentations/:id', protectRoute, async (req, res) => {
    try {
        const docToDelete = await Documentation.findById(req.params.id);
        if (!docToDelete) return res.status(404).json({ message: 'Dokumentasi tidak ditemukan' });

        // Hapus thumbnail
        try {
            if (docToDelete.thumbnail) {
                const publicId = getPublicIdFromUrl(docToDelete.thumbnail);
                if (publicId) await cloudinary.uploader.destroy(publicId);
            }
        } catch (err) { console.error('Gagal hapus thumbnail:', err); }

        // Hapus semua media
        if (docToDelete.media?.length) {
            for (const mediaItem of docToDelete.media) {
                try {
                    const publicId = getPublicIdFromUrl(mediaItem.url);
                    if (publicId) {
                        const resourceType = mediaItem.type === 'video' ? 'video' : 'image';
                        await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
                    }
                } catch (err) { console.error('Gagal hapus media:', err); }
            }
        }

        // Hapus dokumen
        await Documentation.findByIdAndDelete(req.params.id);

        res.json({ message: 'Dokumentasi dan semua file terkait berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// === LOGIN ENDPOINT ===
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (!password)
        return res.status(400).json({ success: false, message: 'Password is required.' });

    if (password === process.env.ADMIN_PASSWORD)
        return res.status(200).json({ success: true, message: 'Login successful.' });

    res.status(401).json({ success: false, message: 'Incorrect password.' });
});

// === SERVER START ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () =>
    console.log(`🚀 Server berjalan di http://0.0.0.0:${PORT}`)
);

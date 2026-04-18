// src/pages/AdminPage.jsx

import React, { useState, useEffect } from 'react';

// URL API yang sudah disesuaikan untuk "documentations"
const API_DOCS_URL = `${import.meta.env.VITE_API_URL}/api/documentations`;
const API_UPLOAD_URL = `${import.meta.env.VITE_API_URL}/api/upload`;

export default function AdminPage() {
    // State untuk manajemen UI dan data
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [documentations, setDocumentations] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Event',
        client: '',
        eventDate: '',
        location: '',
        description: '',
        thumbnail: '',
        mediaUrls: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Fungsi untuk mengambil semua dokumentasi dari backend
    const fetchDocumentations = async () => {
        try {
            const res = await fetch(API_DOCS_URL);
            if (!res.ok) throw new Error(`Gagal mengambil data: ${res.statusText}`);
            const data = await res.json();
            setDocumentations(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
            setDocumentations([]);
        }
    };

    // Handler untuk form login
    const handleLogin = (e) => {
        e.preventDefault();
        setIsAuthenticated(true);
        fetchDocumentations();
    };

    // Handler untuk input teks dan select
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handler untuk input file
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Fungsi untuk membatalkan mode edit dan mereset form
    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ title: '', category: 'Event', client: '', eventDate: '', location: '', description: '', thumbnail: '', mediaUrls: '' });
        setFile(null);
        const fileInput = document.getElementById('file-input');
        if (fileInput) fileInput.value = null;
    };
    
    // Handler untuk men-submit form (membuat atau mengupdate)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        let thumbnailUrl = formData.thumbnail;

        if (file) {
            setUploading(true);
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            try {
                const uploadRes = await fetch(API_UPLOAD_URL, {
                    method: 'POST',
                    headers: { 'x-admin-password': password },
                    body: uploadFormData,
                });
                if (!uploadRes.ok) throw new Error(`Upload file gagal: ${uploadRes.statusText}`);
                const uploadData = await uploadRes.json();
                thumbnailUrl = uploadData.url;
            } catch (err) {
                setError(err.message);
                setUploading(false);
                return;
            } finally {
                setUploading(false);
            }
        }

        const media = formData.mediaUrls.split(',').map(url => url.trim()).filter(url => url).map(url => ({
            type: url.includes('video') || url.endsWith('.mp4') ? 'video' : 'image',
            url: url
        }));

        const payload = { ...formData, thumbnail: thumbnailUrl, media: media };
        delete payload.mediaUrls; // Hapus field sementara sebelum dikirim

        const isEditing = editingId !== null;
        const url = isEditing ? `${API_DOCS_URL}/${editingId}` : API_DOCS_URL;
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(`Gagal menyimpan: ${res.statusText}`);
        } catch (err) {
            setError(err.message);
            return;
        }

        handleCancelEdit();
        fetchDocumentations();
    };

    // Handler untuk mengaktifkan mode edit
    const handleEdit = (doc) => {
        setEditingId(doc._id);
        setFormData({
            ...doc,
            eventDate: doc.eventDate ? new Date(doc.eventDate).toISOString().split('T')[0] : '',
            mediaUrls: doc.media.map(m => m.url).join(', '),
        });
        setFile(null);
        const fileInput = document.getElementById('file-input');
        if (fileInput) fileInput.value = null;
    };

    // Handler untuk menghapus dokumentasi
    const handleDelete = async (id) => {
        if (window.confirm('Anda yakin ingin menghapus item ini?')) {
            try {
                const res = await fetch(`${API_DOCS_URL}/${id}`, {
                    method: 'DELETE',
                    headers: { 'x-admin-password': password },
                });
                if (!res.ok) throw new Error(`Gagal menghapus: ${res.statusText}`);
                fetchDocumentations();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    useEffect(() => {
        // Saat komponen AdminPage dimuat, kembalikan kursor ke default
        document.body.style.cursor = 'default';

        // Fungsi cleanup: saat komponen AdminPage ditinggalkan, sembunyikan lagi
        return () => {
            document.body.style.cursor = 'none';
        };
    }, []);

    // Tampilan Login
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan kata sandi" className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
                    <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 p-2 rounded">Masuk</button>
                </form>
            </div>
        );
    }

    // Tampilan Panel Admin
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Admin Panel - Dokumentasi Karya</h1>
            
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <h2 className="text-2xl font-semibold col-span-1 md:col-span-2">{editingId ? 'Edit Dokumentasi' : 'Tambah Dokumentasi Baru'}</h2>
                
                <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Judul Karya" required className="p-2 rounded bg-gray-700 border-gray-600 col-span-1 md:col-span-2" />
                
                <div className="col-span-1">
                    <label className="block mb-2 text-sm">Kategori</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 rounded bg-gray-700 border-gray-600">
                        <option value="Event">Event</option>
                        <option value="Trip">Trip</option>
                        <option value="Meet & Greet">Meet & Greet</option>
                    </select>
                </div>
                
                <div className="col-span-1">
                    <label className="block mb-2 text-sm">Tanggal Acara</label>
                    <input type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} className="w-full p-2 rounded bg-gray-700 border-gray-600"/>
                </div>

                <input name="client" value={formData.client} onChange={handleInputChange} placeholder="Klien" className="p-2 rounded bg-gray-700 border-gray-600" />
                <input name="location" value={formData.location} onChange={handleInputChange} placeholder="Lokasi" className="p-2 rounded bg-gray-700 border-gray-600" />
                
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Deskripsi Singkat" className="p-2 rounded bg-gray-700 border-gray-600 col-span-1 md:col-span-2" />

                <div className="col-span-1 md:col-span-2">
                    <label htmlFor="file-input" className="block mb-2 text-sm">File Thumbnail</label>
                    <input id="file-input" type="file" onChange={handleFileChange} accept="image/*" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    {editingId && formData.thumbnail && <p className="text-xs text-gray-500 mt-2">Biarkan kosong jika tidak ingin mengubah thumbnail. <a href={formData.thumbnail} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Lihat thumbnail</a></p>}
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className="block mb-2 text-sm">URL Foto & Video (pisahkan dengan koma)</label>
                    <textarea name="mediaUrls" value={formData.mediaUrls} onChange={handleInputChange} placeholder="https://.../foto1.jpg, https://.../video1.mp4, ..." className="w-full p-2 rounded bg-gray-700 border-gray-600" rows="6" />
                </div>
                
                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                    <button type="submit" disabled={uploading} className="bg-green-600 hover:bg-green-700 p-2 rounded w-full disabled:bg-gray-500">
                        {uploading ? 'Mengupload...' : (editingId ? 'Update Karya' : 'Simpan Karya')}
                    </button>
                    {editingId && <button type="button" onClick={handleCancelEdit} className="bg-gray-600 hover:bg-gray-700 p-2 rounded w-full">Batal Edit</button>}
                </div>
            </form>

            {error && <p className="text-red-400 text-center mb-4 bg-red-900/50 p-3 rounded-lg">Error: {error}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentations.map(doc => (
                    <div key={doc._id} className="bg-gray-800 p-4 rounded-lg flex flex-col">
                        <img src={doc.thumbnail} alt={doc.title} className="w-full h-40 object-cover rounded mb-4" />
                        <h3 className="text-xl font-bold">{doc.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 flex-grow">{doc.description}</p>
                        <div className="flex gap-2 mt-auto">
                            <button onClick={() => handleEdit(doc)} className="bg-yellow-600 hover:bg-yellow-700 p-2 text-sm rounded w-full">Edit</button>
                            <button onClick={() => handleDelete(doc._id)} className="bg-red-600 hover:bg-red-700 p-2 text-sm rounded w-full">Hapus</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
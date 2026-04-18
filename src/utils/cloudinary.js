// src/utils/cloudinary.js
export const getVideoThumbnail = (url) => {
    if (!url || typeof url !== 'string') {
        return ''; // Kembalikan string kosong jika URL tidak valid
    }

    // Cek apakah ini URL video Cloudinary
    if (url.includes('/video/upload/')) {
        // Ganti bagian URL dan ubah ekstensi menjadi .jpg
        return url.replace('/video/upload/', '/image/upload/').replace(/\.\w+$/, '.jpg');
    }

    // Jika bukan video Cloudinary (misalnya sudah berupa gambar), kembalikan URL asli
    return url;
};
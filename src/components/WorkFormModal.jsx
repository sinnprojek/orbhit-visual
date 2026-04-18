import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const API_DOCS_URL = 'http://localhost:5000/api/documentations';
const API_UPLOAD_URL = 'http://localhost:5000/api/upload';

export default function WorkFormModal({ isOpen, onClose, onSave, initialData, password }) {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Event',
        client: '',
        eventDate: '',
        location: '',
        description: '',
        mediaUrls: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [fileType, setFileType] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const modalRef = useRef(null);
    const titleInputRef = useRef(null);

    // Autofill form data when editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                eventDate: initialData.eventDate
                    ? new Date(initialData.eventDate).toISOString().split('T')[0]
                    : '',
                mediaUrls: initialData.media
                    ? initialData.media.map((m) => m.url).join(', ')
                    : '',
            });
            if (initialData.media?.[0]) {
                setPreview(initialData.media[0].url);
                setFileType(initialData.media[0].type);
            }
        } else {
            setFormData({
                title: '',
                category: 'Event',
                client: '',
                eventDate: '',
                location: '',
                description: '',
                mediaUrls: '',
            });
            setPreview('');
            setFileType('');
        }
    }, [initialData]);

    // Auto focus title field when modal opens
    useEffect(() => {
        if (isOpen && titleInputRef.current) {
            setTimeout(() => titleInputRef.current.focus(), 150);
        }
    }, [isOpen]);

    // Close modal with Esc key
    useEffect(() => {
        const handleEsc = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Close modal when clicking outside
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };

    const handleInputChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (!selectedFiles.length) return;
        setFile(selectedFiles);

        // Preview file pertama saja (untuk simplicity)
        const first = selectedFiles[0];
        setFileType(first.type.startsWith('image') ? 'image' : 'video');
        setPreview(URL.createObjectURL(first));
    };

    // Upload media file ke server
    const uploadMediaFiles = async (files) => {
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));

        const res = await fetch(API_UPLOAD_URL, {
            method: 'POST',
            headers: { 'x-admin-password': password },
            body: formData,
        });

        if (!res.ok) throw new Error('Upload gagal.');

        const data = await res.json(); // { media: [...] }
        return data.media;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const toastId = toast.loading('Memvalidasi dan menyimpan...');

        let thumbnailUrl = formData.thumbnail;
        let uploadedMedia = [];

        // Validasi
        if (!formData.title.trim()) {
            toast.error('Judul karya wajib diisi.', { id: toastId });
            setSubmitting(false);
            return;
        }

        if (!initialData && (!file || file.length === 0)) {
            toast.error('File thumbnail wajib diisi untuk karya baru.', { id: toastId });
            setSubmitting(false);
            return;
        }

        try {
            // Upload semua file
            if (file && file.length) {
                toast.loading('Mengupload media...', { id: toastId });
                uploadedMedia = await uploadMediaFiles(file);
                // Set thumbnail ke file pertama yang diupload
                thumbnailUrl = uploadedMedia[0].url;
            }

            // Tambah media URL manual (jika diisi)
            const extraUrls = formData.mediaUrls
                .split(',')
                .map((url) => url.trim())
                .filter((url) => url);

            const combinedMedia = [
                ...uploadedMedia,
                ...extraUrls.map((url) => ({
                    type: url.endsWith('.mp4') || url.includes('video') ? 'video' : 'image',
                    url,
                })),
            ];

            // Kirim ke API
            toast.loading('Menyimpan data karya...', { id: toastId });

            const payload = {
                ...formData,
                thumbnail: thumbnailUrl,
                media: combinedMedia,
            };
            delete payload.mediaUrls;

            const isEditing = initialData?._id;
            const url = isEditing ? `${API_DOCS_URL}/${initialData._id}` : API_DOCS_URL;
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Gagal menyimpan karya!');
            }

            toast.success('Karya berhasil disimpan!', { id: toastId });
            onSave();
            onClose();
        } catch (err) {
            toast.error(err.message, { id: toastId });
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in"
        >
            <div
                ref={modalRef}
                className="bg-gradient-to-b from-[#111a2e]/90 to-[#0c1221]/90 border border-[#ffb347]/30 rounded-2xl shadow-[0_0_25px_rgba(255,179,71,0.2)] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#ffb347]/30">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f6d68a] to-[#ffb347] bg-clip-text text-transparent">
                        {initialData ? 'Edit Work' : 'Add New Work'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-[#ffb347] transition-colors"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Title</label>
                        <input
                            ref={titleInputRef}
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., Wedding Outdoor Bandung 2025"
                            required
                            className="w-full p-3 rounded-lg bg-[#1a2236] border border-[#ffb347]/20 text-gray-200 focus:border-[#ffb347] focus:ring-1 focus:ring-[#ffb347] transition"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full p-3 rounded-lg bg-[#1a2236] border border-[#ffb347]/20 text-gray-300 focus:border-[#ffb347]"
                            >
                                <option value="Event">Event</option>
                                <option value="Trip">Trip</option>
                                <option value="Meet & Greet">Meet & Greet</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Event Date</label>
                            <input
                                type="date"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleInputChange}
                                className="w-full p-3 rounded-lg bg-[#1a2236] border border-[#ffb347]/20 text-gray-300 focus:border-[#ffb347]"
                            />
                        </div>
                    </div>

                    <input
                        name="client"
                        value={formData.client}
                        onChange={handleInputChange}
                        placeholder="Client / Partner"
                        className="w-full p-3 rounded-lg bg-[#1a2236] border border-[#ffb347]/20 text-gray-300 focus:border-[#ffb347]"
                    />

                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Location"
                        className="w-full p-3 rounded-lg bg-[#1a2236] border border-[#ffb347]/20 text-gray-300 focus:border-[#ffb347]"
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Short description of the project"
                        required
                        className="w-full p-3 rounded-lg bg-[#1a2236] border border-[#ffb347]/20 text-gray-300 focus:border-[#ffb347] min-h-[100px]"
                    />

                    {/* Single File Upload */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Media (Image/Video)</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*,video/*"
                            multiple
                            className="block w-full text-sm text-gray-300 mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#ffb347]/20 file:text-[#ffb347] hover:file:bg-[#ffb347]/30 transition"
                        />
                        {preview && fileType === 'image' && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-3 w-full max-h-48 object-cover rounded-lg border border-[#ffb347]/30"
                            />
                        )}
                        {preview && fileType === 'video' && (
                            <video
                                src={preview}
                                controls
                                className="mt-3 w-full max-h-48 rounded-lg border border-[#ffb347]/30"
                            />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Media URLs (comma separated)
                        </label>
                        <textarea
                            name="mediaUrls"
                            value={formData.mediaUrls}
                            onChange={handleInputChange}
                            placeholder="https://.../photo1.jpg, https://.../video1.mp4"
                            className="w-full p-3 rounded-lg bg-[#1a2236] border border-[#ffb347]/20 text-gray-300 focus:border-[#ffb347] min-h-[80px]"
                        />
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-[#ffb347]/30">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="relative px-5 py-2.5 rounded-xl border border-[#ffb347]/40 text-gray-300 
                                        overflow-hidden group transition-all duration-300
                                        hover:text-[#ffb347] hover:shadow-[0_0_15px_rgba(255,179,71,0.4)]"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="relative px-5 py-2.5 rounded-xl font-semibold text-[#0c1221]
                                        bg-gradient-to-r from-[#ffb347] via-[#f6d68a] to-[#ffb347]
                                        hover:from-[#f6d68a] hover:to-[#ffb347]
                                        transition-all duration-300 hover:scale-[1.03] active:scale-95
                                        shadow-[0_0_15px_rgba(255,179,71,0.4)] disabled:opacity-60"
                        >
                            {submitting ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-t-transparent border-[#0c1221] rounded-full animate-spin"></span>
                                    Saving...
                                </span>
                            ) : (
                                <span>{initialData ? 'Update' : 'Save'}</span>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
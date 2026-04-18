// src/pages/admin/ManageWorksPage.jsx

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Camera, Edit, Trash2 } from 'lucide-react';
import WorkFormModal from '@/components/WorkFormModal';
import toast from 'react-hot-toast';

const API_DOCS_URL = 'http://localhost:5000/api/documentations';

export default function ManageWorksPage() {
    const [documentations, setDocumentations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoc, setEditingDoc] = useState(null);

    const adminPassword = sessionStorage.getItem('adminPassword');

    const fetchDocumentations = async () => {
        setLoading(true);
        try {
        const res = await fetch(API_DOCS_URL);
        if (!res.ok) throw new Error('Failed to fetch data from server.');
        const data = await res.json();
        setDocumentations(Array.isArray(data) ? data : []);
        } catch (err) {
        setError(err.message);
        toast.error(err.message);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocumentations();
    }, []);

    const handleAddNew = () => {
        setEditingDoc(null);
        setIsModalOpen(true);
    };

    const handleEdit = (doc) => {
        setEditingDoc(doc);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this documentation?')) {
        const toastId = toast.loading('Deleting...');
        try {
            const res = await fetch(`${API_DOCS_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'x-admin-password': adminPassword },
            });
            if (!res.ok) throw new Error('Failed to delete documentation.');
            toast.success('Documentation deleted successfully!', { id: toastId });
            fetchDocumentations();
        } catch (err) {
            toast.error(err.message, { id: toastId });
        }
        }
    };

    const handleModalSave = () => {
        setIsModalOpen(false);
        fetchDocumentations();
    };

    // Fungsi menentukan preview berdasarkan tipe media
    const getMediaPreview = (doc) => {
        const firstMedia = doc.media?.[0];
        if (!firstMedia) {
        return (
            <img
            src={doc.thumbnail}
            alt={doc.title}
            className="h-12 w-20 object-cover rounded border border-gray-700"
            />
        );
        }

        if (firstMedia.type === 'video') {
        return (
            <div className="relative group h-12 w-20 overflow-hidden rounded border border-gray-700">
            <video
                src={firstMedia.url}
                muted
                loop
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            </div>
        );
        }

        return (
        <img
            src={firstMedia.url || doc.thumbnail}
            alt={doc.title}
            className="h-12 w-20 object-cover rounded border border-gray-700 hover:scale-105 transition-transform"
        />
        );
    };

    return (
        <>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left">
            Manage Projects
            </h1>

            <div className="flex justify-center sm:justify-end">
            <Button
                onClick={handleAddNew}
                className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-xl
                bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600
                text-white font-semibold shadow-lg hover:shadow-xl
                hover:scale-[1.03] active:scale-95 transition-all duration-300"
            >
                <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Add</span>
                <Plus className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            </div>
        </div>

        {loading && <p>Loading documentation data...</p>}
        {error && <p className="text-red-400">Error: {error}</p>}

        {!loading && !error && (
            <div className="border border-gray-700 rounded-lg overflow-x-auto scrollbar-hide">
            <table className="min-w-full divide-y divide-gray-700 text-sm">
                <thead className="bg-gray-800/50">
                <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-400 uppercase whitespace-nowrap">
                    Preview
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-400 uppercase whitespace-nowrap">
                    Title
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-400 uppercase whitespace-nowrap">
                    Category
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-400 uppercase whitespace-nowrap">
                    Date
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-gray-400 uppercase whitespace-nowrap">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                {documentations.map((doc) => (
                    <tr key={doc._id} className="hover:bg-gray-800/30 transition">
                    <td className="px-4 py-3 whitespace-nowrap">{getMediaPreview(doc)}</td>
                    <td className="px-4 py-3 text-gray-50">{doc.title}</td>
                    <td className="px-4 py-3 text-gray-400">{doc.category}</td>
                    <td className="px-4 py-3 text-gray-400">
                        {doc.eventDate
                        ? new Date(doc.eventDate).toLocaleDateString('en-US')
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-right">
                        <button
                        onClick={() => handleEdit(doc)}
                        className="text-amber-400 hover:text-amber-300 mr-3"
                        title="Edit"
                        >
                        <Edit size={18} />
                        </button>
                        <button
                        onClick={() => handleDelete(doc._id)}
                        className="text-red-500 hover:text-red-400"
                        title="Delete"
                        >
                        <Trash2 size={18} />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}

        {isModalOpen && (
            <WorkFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleModalSave}
            initialData={editingDoc}
            password={adminPassword}
            />
        )}
        </>
    );
}
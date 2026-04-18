// src/pages/GalleryPage.jsx


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Link } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';
import BackButton from '@/components/BackButton';
import { apiGet } from '@/utils/api';

/**
 * Buat thumbnail otomatis untuk video Cloudinary
 * Jika video => ubah /upload/ jadi /upload/so_auto,q_auto,f_jpg/
 */
function getVideoThumbnail(url, type) {
    if (!url) return '/fallback.jpg';
    if (type === 'video') {
        return url.replace('/upload/', '/upload/so_auto,q_auto,f_jpg/');
    }
    return url;
}

export default function GalleryPage() {
    const [documentations, setDocumentations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchDocumentations = async () => {
            try {
                const data = await apiGet('/api/documentations');
                setDocumentations(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
                setDocumentations([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDocumentations();
    }, []);

    const filteredDocs = documentations.filter(
        (doc) => filter === 'All' || doc.category === filter
    );

    const filterButtons = ['All', 'Event', 'Trip', 'Meet & Greet'];

    return (
        <div className="min-h-screen bg-transparent text-white relative">
            <ParticleBackground />
            <div className="relative z-10 max-w-6xl mx-auto p-6 md:p-8">
                <div className="fixed top-8 left-8 z-50">
                    <BackButton to="/" />
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-[#e8c48f] to-[#ffb347] bg-clip-text text-transparent"
                >
                    Project Gallery
                </motion.h1>

                <div className="flex justify-center flex-wrap gap-4 mb-12">
                    {filterButtons.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                                filter === cat
                                    ? 'bg-gradient-to-r from-[#f6d68a] to-[#ffb347] text-black shadow-md scale-105'
                                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 backdrop-blur-sm'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {loading && (
                    <p className="text-center text-white py-20">Loading projects...</p>
                )}
                {error && (
                    <p className="text-center text-red-400 py-20">
                        Failed to load data: {error}
                    </p>
                )}

                {!loading && !error && (
                    <motion.div layout className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {filteredDocs.length > 0 ? (
                            filteredDocs.map((doc) => {
                                const media = doc.media?.[0];
                                const isVideo = media?.type === 'video';

                                return (
                                    <Link to={`/gallery/${doc._id}`} key={doc._id}>
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="h-full"
                                        >
                                            <Card className="bg-gradient-to-b from-[#111a2e] to-[#0c1221] border border-[#ffb347]/20 hover:shadow-[0_0_25px_rgba(255,180,80,0.25)] hover:border-[#ffb347]/50 transition-all duration-300 h-full relative overflow-hidden group">
                                                <CardContent className="p-4">
                                                    <div className="relative rounded-xl overflow-hidden mb-4 h-48 w-full">
                                                        {isVideo ? (
                                                            <div className="relative group h-full w-full overflow-hidden rounded-xl">
                                                                <video
                                                                    src={media.url}
                                                                    muted
                                                                    loop
                                                                    autoPlay
                                                                    playsInline
                                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <img
                                                                src={getVideoThumbnail(
                                                                    media?.url || doc.thumbnail,
                                                                    media?.type
                                                                )}
                                                                alt={doc.title}
                                                                className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                                            />
                                                        )}
                                                    </div>

                                                    <h3 className="text-lg font-bold text-white mb-2">
                                                        {doc.title}
                                                    </h3>
                                                    <p className="text-blue-100/70 text-sm line-clamp-2">
                                                        {doc.description}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </Link>
                                );
                            })
                        ) : (
                            <p className="text-center col-span-full text-gray-400 py-20">
                                No projects available for this category.
                            </p>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
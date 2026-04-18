import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

function getVideoThumbnail(url, type) {
    if (!url) return '/fallback.jpg';
    if (type === 'video') {
        return url.replace('/upload/', '/upload/so_auto,q_auto,f_jpg/');
    }
    return url;
}

export default function GallerySection() {
    const [latestDocs, setLatestDocs] = useState([]);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/documentations'
                );
                const data = await response.json();

                if (Array.isArray(data)) {
                    const sorted = data
                        .sort((a, b) => new Date(b.eventDate || b._id) - new Date(a.eventDate || a._id))
                        .slice(0, 6);
                    setLatestDocs(sorted);
                } else {
                    setLatestDocs([]);
                }
            } catch (error) {
                console.error('Failed to load latest works:', error);
            }
        };

        fetchLatest();
    }, []);

    return (
        <section
            id="portfolio"
            className="max-w-6xl mx-auto py-20 px-6 relative z-10 font-['Poppins']"
        >
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl font-semibold text-center mb-12 bg-gradient-to-r from-[#e8c48f] to-[#ffb347] bg-clip-text text-transparent"
            >
                Karya Terbaru Kami
            </motion.h2>

            {/* Gallery Grid */}
            <div className="grid md:grid-cols-3 gap-8">
                {latestDocs.map((doc) => {
                    const media = doc.media?.[0];
                    const isVideo = media?.type === 'video';

                    return (
                        <Link to={`/gallery/${doc._id}`} key={doc._id}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="h-full"
                            >
                                <Card className="relative overflow-hidden bg-gradient-to-b from-[#111a2e] to-[#0c1221] border border-[#ffb347]/20 hover:shadow-[0_0_25px_rgba(255,180,80,0.25)] hover:border-[#ffb347]/50 transition-all duration-300 rounded-xl">
                                    <div className="relative h-48 w-full overflow-hidden rounded-xl group">
                                        {isVideo ? (
                                            <video
                                                src={media.url}
                                                muted
                                                loop
                                                autoPlay
                                                playsInline
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <img
                                                src={getVideoThumbnail(media?.url || doc.thumbnail, media?.type)}
                                                alt={doc.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        )}

                                        {/* Overlay Title on Hover */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                            <h3 className="text-white font-semibold text-sm md:text-base">
                                                {doc.title}
                                            </h3>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            {/* Button View All */}
            <div className="text-center mt-16">
                <Link to="/gallery">
                    <Button className="px-8 py-3 text-lg bg-gradient-to-r from-[#1e2a47] to-[#1a253c] hover:from-[#ffb347] hover:to-[#e8c48f] text-white rounded-2xl shadow-[0_0_20px_rgba(255,200,100,0.2)] font-medium transition-all duration-300 hover:scale-105">
                        Lihat Semua Karya
                    </Button>
                </Link>
            </div>
        </section>
    );
}
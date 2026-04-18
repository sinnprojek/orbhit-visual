// src/components/WorkCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Link } from 'react-router-dom';

/**
 * Membuat thumbnail dari Cloudinary video.
 * Jika format video, maka tampilkan video preview.
 */
function getVideoThumbnail(url, type) {
    if (!url) return '/fallback.jpg';
    if (type === 'video') {
        return url.replace('/upload/', '/upload/so_auto,q_auto,f_jpg/');
    }
    return url;
}

export default function WorkCard({ doc }) {
    const media = doc.media?.[0];
    const isVideo = media?.type === 'video';

    return (
        <Link to={`/gallery/${doc._id}`}>
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
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
                                    src={getVideoThumbnail(media?.url || doc.thumbnail, media?.type)}
                                    alt={doc.title}
                                    className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                />
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{doc.title}</h3>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    );
}
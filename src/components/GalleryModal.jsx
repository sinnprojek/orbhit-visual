import React, { useState, lazy, Suspense } from "react";
const ReactPlayer = lazy(() => import("react-player"));
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { X } from "lucide-react";

export default function GalleryModal({ doc, onClose }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    if (!doc) return null;

    const video = doc.media ? doc.media.find((m) => m.type === "video") : null;
    const images = doc.media ? doc.media.filter((m) => m.type === "image") : [];

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
        >
            <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-b from-[#111a2e] to-[#0c1221] border border-[#ffb347]/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative shadow-[0_0_40px_rgba(255,180,80,0.2)]"
            >
            {/* Tombol Close */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
                <X size={24} />
            </button>

            {/* Judul & Deskripsi */}
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f6d68a] to-[#ffb347] mb-2">
                {doc.title}
            </h2>
            <p className="text-blue-100/70 mb-6">{doc.description}</p>

            {/* Player Video */}
            {video && (
                <div className="w-full aspect-video mb-6 bg-black rounded-lg overflow-hidden shadow-[0_0_20px_rgba(255,180,80,0.15)]">
                <Suspense
                    fallback={
                    <div className="text-center text-white py-10">
                        Loading video...
                    </div>
                    }
                >
                    <ReactPlayer
                    url={video.url}
                    width="100%"
                    height="100%"
                    controls
                    />
                </Suspense>
                </div>
            )}

            {/* Galeri Foto */}
            {images.length > 0 && (
                <>
                <h3 className="text-xl font-semibold text-white mb-4 border-l-4 border-[#ffb347] pl-3">
                    Photo Gallery
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {images.map((img, index) => (
                    <div
                        key={index}
                        className="aspect-square rounded-md overflow-hidden"
                        onClick={() => openLightbox(index)}
                    >
                        <img
                        src={img.url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    ))}
                </div>
                </>
            )}
            </div>
        </div>

        {/* Lightbox untuk gambar */}
        <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={images.map((img) => ({ src: img.url }))}
            index={lightboxIndex}
        />
        </>
    );
}
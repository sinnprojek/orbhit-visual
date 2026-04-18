import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ParticleBackground from "@/components/ParticleBackground";
import BackButton from "@/components/BackButton";
import { apiGet } from "@/utils/api";

export default function DetailPage() {
    const { id } = useParams();
    const [doc, setDoc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        const fetchDoc = async () => {
            try {
                const data = await apiGet(`/api/documentations/${id}`);
                setDoc(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoc();
    }, [id]);

    if (loading)
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="text-center text-white">Loading project details...</p>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="text-center text-red-400">Error: {error}</p>
            </div>
        );

    const media = doc?.media || [];

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const getCloudinaryIframe = (url) => {
        try {
            const publicId = url.split("/upload/")[1]?.split(".")[0];
            if (!publicId) return null;

            const embedUrl = `https://player.cloudinary.com/embed/?cloud_name=dlsuncf4e&public_id=${encodeURIComponent(
                publicId
            )}&profile=cld-default`;

            return (
                <iframe
                    src={embedUrl}
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                    className="w-full aspect-video rounded-xl"
                    style={{
                        border: "none",
                        height: "auto",
                        minHeight: "400px",
                        maxHeight: "80vh",
                    }}
                />
            );
        } catch {
            return null;
        }
    };

    return (
        <>
            <div className="min-h-screen bg-transparent text-white relative">
                <ParticleBackground />

                <div className="relative z-10 max-w-6xl mx-auto p-6 md:p-10">
                    <div className="fixed top-8 left-8 z-50">
                        <BackButton to="/gallery" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f6d68a] to-[#ffb347] mb-3">
                        {doc.title}
                    </h1>

                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-400 mb-6">
                        <span>Category: {doc.category}</span>
                        {doc.location && <span>Location: {doc.location}</span>}
                        {doc.client && <span>Client: {doc.client}</span>}
                        {doc.eventDate && (
                            <span>
                                Date:{" "}
                                {new Date(doc.eventDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        )}
                    </div>

                    <p className="text-gray-300 mb-10 leading-relaxed text-lg">
                        {doc.description}
                    </p>

                    {media.length > 0 && (
                        <>
                            <h3 className="text-2xl font-semibold text-white mb-8">
                                Media Karya
                            </h3>

                            <div className="flex flex-col gap-12 items-center">
                                {media.map((m, index) => (
                                    <div
                                        key={index}
                                        className="w-full max-w-5xl cursor-pointer rounded-xl overflow-hidden border border-[#ffb347]/30 shadow-[0_0_30px_rgba(255,179,71,0.3)] hover:shadow-[0_0_40px_rgba(255,200,100,0.5)] transition-all duration-300"
                                        onClick={() => openLightbox(index)}
                                    >
                                        {m.type === "image" ? (
                                            <img
                                                src={m.url}
                                                alt={`Media ${index + 1}`}
                                                className="w-full h-auto object-cover rounded-xl"
                                                style={{ maxHeight: "80vh" }}
                                            />
                                        ) : (
                                            getCloudinaryIframe(m.url)
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={media.map((m) =>
                    m.type === "image"
                        ? { src: m.url }
                        : { type: "video", src: m.url }
                )}
                index={lightboxIndex}
            />
        </>
    );
}
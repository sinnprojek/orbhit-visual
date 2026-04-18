import React, { useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";

import GalleryModal from "@/components/GalleryModal";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

import { Github, Linkedin, Instagram, MapPin } from "lucide-react";

export default function MainLayout() {
    const [selectedDoc, setSelectedDoc] = useState(null);

    const handleDocSelect = (doc) => setSelectedDoc(doc);
    const handleCloseModal = () => setSelectedDoc(null);

    return (
        <div className="min-h-screen bg-transparent text-gray-200 font-['Poppins'] relative overflow-hidden scroll-smooth">
        <ParticleBackground />
        <Navbar />
        <CustomCursor />

        {/* Background glow effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,80,0.15),rgba(0,0,0,0)_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,120,40,0.1),transparent_60%)]" />

        <main className="relative z-10">
            <section id="home"><HeroSection /></section>
            <section id="about"><AboutSection /></section>
            <section id="gallery"><GallerySection onDocSelect={handleDocSelect} /></section>
            <section id="contact"><ContactSection /></section>
        </main>

        {/* Footer */}
        <footer className="relative z-10 text-center py-8 text-blue-100/50 text-sm border-t border-blue-900/30">
            © {new Date().getFullYear()} Orbhit Visual. All Rights Reserved.
        </footer>

        {/* Gallery Modal */}
        <GalleryModal doc={selectedDoc} onClose={handleCloseModal} />
        </div>
    );
}

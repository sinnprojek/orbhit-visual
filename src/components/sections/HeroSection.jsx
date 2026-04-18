import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function HeroSection() {
    // Smooth scroll ke bagian portfolio
    const scrollToPortfolio = () => {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            className="relative flex flex-col items-center justify-center text-center h-screen px-4 font-['Poppins']"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="z-10 flex flex-col items-center"
            >
                {/* Logo */}
                <img
                    src="/Logo_Type.png"
                    alt="Orbhit Visual Logo"
                    className="h-24 md:h-32 w-auto mb-4 drop-shadow-[0_0_15px_rgba(255,200,100,0.3)]"
                />

                {/* Tagline */}
                <p className="mt-4 text-lg md:text-xl text-blue-100/80 font-light tracking-wide">
                    Photographer • Videographer • Photo & Video Editor
                </p>

                {/* Button CTA */}
                <Button
                    onClick={scrollToPortfolio}
                    className="mt-8 px-8 py-3 text-lg font-medium bg-gradient-to-r from-[#1e2a47] to-[#1a253c] hover:from-[#ffb347] hover:to-[#e8c48f] text-white rounded-2xl shadow-[0_0_20px_rgba(255,200,100,0.2)] transition-all duration-300 hover:scale-105"
                >
                    Karya
                </Button>
            </motion.div>

            {/* Background bintang */}
            <div className="absolute inset-0 bg-[url('/stars-bg.png')] bg-cover bg-center opacity-25 animate-pulse-slow" />

            {/* Efek cahaya halus */}
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-[#ffb347]/10 to-[#f6d68a]/5 rounded-full blur-3xl -z-10" />
        </section>
    );
}
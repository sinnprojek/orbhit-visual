// src/components/sections/ContactSection.jsx
import React from "react";
import { FaEnvelope, FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="bg-[#0b0b12] py-28 text-white font-['Poppins'] overflow-hidden"
        >
            <div className="max-w-2xl mx-auto px-6 text-center animate-fade-up">
                {/* Title */}
                <h2 className="text-4xl font-semibold mb-2 bg-gradient-to-r from-[#f6d68a] to-[#ffb347] bg-clip-text text-transparent tracking-wide">
                    Kontak Orbhit
                </h2>
                <p className="text-gray-400 mb-14 text-lg font-light">
                    Siap menangkap setiap momen berharga Anda.
                </p>

                {/* Contact Info */}
                <div className="space-y-4 mb-14 animate-fade-in">
                    <p className="flex items-center justify-center gap-3 text-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#f6d68a] to-[#ffb347] bg-clip-text text-transparent">
                        <FaEnvelope className="text-[#f6d68a]" /> orbhitvisual@gmail.com
                    </p>
                    <p className="flex items-center justify-center gap-3 text-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#f6d68a] to-[#ffb347] bg-clip-text text-transparent">
                        <FaWhatsapp className="text-[#f6d68a]" /> 0877-8558-2600
                    </p>
                    <p className="flex items-center justify-center gap-3 text-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#f6d68a] to-[#ffb347] bg-clip-text text-transparent">
                        <FaInstagram className="text-[#f6d68a]" /> @orbhitvisual
                    </p>
                </div>

                {/* Tagline */}
                <p className="text-gray-500 italic text-sm">
                    Mengorbit dengan Visual Memukau.
                    <br />— Orbhit Visual
                </p>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                    animation: fade-up 1.2s ease forwards;
                }
                .animate-fade-in {
                    animation: fade-in 1.8s ease forwards;
                }
            `}</style>
        </section>
    );
}
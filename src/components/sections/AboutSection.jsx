import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
    return (
        <section className="relative py-24 px-6 bg-gradient-to-b from-[#0c0e19] to-[#111728] overflow-hidden font-['Poppins']">
            {/* Judul */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-5xl font-semibold text-center mb-12 bg-gradient-to-r from-[#f6d68a] to-[#ffb347] bg-clip-text text-transparent"
            >
                Tentang Orbhit
            </motion.h2>

            {/* Paragraf dengan text-center */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="max-w-3xl mx-auto text-center text-gray-300 space-y-6 leading-relaxed text-lg md:text-xl font-['Poppins']"
            >
                <p>Setiap momen punya cerita.</p>
                <p>Dan kami ada untuk menangkapnya.</p>
                <p>
                    Melalui <span className="text-[#f6d68a] font-medium">foto</span> dan{' '}
                    <span className="text-[#f6d68a] font-medium">video</span>, kami menghadirkan kembali makna di setiap event, trip, dan meet & greet.
                </p>
                <p>
                    Kami merekam <span className="text-[#f6d68a] font-medium">energi</span>,{' '}
                    <span className="text-[#f6d68a] font-medium">emosi</span>, dan detail kecil yang sering terlewat oleh mata, lalu menenunnya menjadi cerita visual yang hidup.
                </p>
                <p>
                    Setiap karya kami lahir dari <span className="text-[#f6d68a] font-medium">kreativitas</span>,{' '}
                    <span className="text-[#f6d68a] font-medium">presisi</span>, dan{' '}
                    <span className="text-[#f6d68a] font-medium">rasa</span> untuk menghadirkan pengalaman yang autentik, menghidupkan kembali perasaan di balik setiap momen.
                </p>
            </motion.div>

            {/* Dekorasi halus */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-[#ffb347]/20 to-[#f6d68a]/10 rounded-full -z-10 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-l from-[#f6d68a]/20 to-[#ffb347]/10 rounded-full -z-10 blur-3xl"></div>
        </section>
    );
}
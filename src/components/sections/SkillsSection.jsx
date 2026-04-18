import React from 'react';
import { motion } from 'framer-motion';

// Daftar keahlian — sesuaikan sesuai bidangmu
const skills = [
    { name: 'Photography', icon: '📸' },
    { name: 'Videography', icon: '🎥' },
    { name: 'Photo Editing', icon: '🖼️' },
    { name: 'Video Editing', icon: '✂️' },
    { name: 'Color Grading', icon: '🎨' },
    { name: 'Storytelling', icon: '📖' },
];

export default function SkillsSection() {
    const FADE_IN_ANIMATION_VARIANTS = {
        initial: { opacity: 0, y: 10 },
        animate: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1 },
        }),
    };

    return (
        <section className="relative py-24 px-6 font-['Poppins'] bg-gradient-to-b from-[#0c0e19] to-[#111728] overflow-hidden">
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-[#f6d68a] to-[#ffb347] bg-clip-text text-transparent"
            >
                Skills & Expertise
            </motion.h2>

            {/* Skill grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 max-w-5xl mx-auto">
                {skills.map((skill, i) => (
                    <motion.div
                        key={skill.name}
                        variants={FADE_IN_ANIMATION_VARIANTS}
                        initial="initial"
                        whileInView="animate"
                        custom={i}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center text-center gap-3 p-6 bg-[#111a2e]/50 rounded-2xl border border-transparent hover:border-[#ffb347]/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,180,80,0.15)]"
                    >
                        <div className="text-4xl">{skill.icon}</div>
                        <p className="text-blue-100/80 text-sm font-light">{skill.name}</p>
                    </motion.div>
                ))}
            </div>

            {/* Dekorasi halus */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-[#ffb347]/20 to-[#f6d68a]/10 rounded-full -z-10 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-l from-[#f6d68a]/20 to-[#ffb347]/10 rounded-full -z-10 blur-3xl"></div>
        </section>
    );
}
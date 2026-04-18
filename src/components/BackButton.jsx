// src/components/BackButton.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function BackButton({ to = "/"}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Link to={to} className="inline-block group">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full 
                    bg-gradient-to-r from-[#0c1221]/80 via-[#1a1f2f]/90 to-[#0c1221]/80
                    border border-[#ffcc70]/30 text-[#f6d68a] font-medium 
                    backdrop-blur-md shadow-[0_0_10px_rgba(255,200,100,0.15)]
                    transition-all duration-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,200,100,0.4)]
                    hover:border-[#ffb347]/70 hover:text-[#fff2d0] hover:bg-gradient-to-r hover:from-[#1a1f2f]/90 hover:to-[#2a2438]/90">
                    <ChevronLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
                </div>
            </Link>
        </motion.div>
    );
}

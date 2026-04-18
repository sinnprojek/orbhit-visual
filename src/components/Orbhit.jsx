import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function OrbitUI() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white">
        <motion.div
            className="relative flex items-center justify-center w-64 h-64 border-4 border-white/40 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
            <motion.div
            className="absolute top-0 left-1/2 w-6 h-6 bg-yellow-400 rounded-full shadow-lg"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-10 bg-white text-gray-900 p-6 rounded-2xl shadow-lg w-80 text-center"
        >
            <Star className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
            <h1 className="text-2xl font-bold mb-2">Orbit UI</h1>
            <p className="text-sm text-gray-600">
            Tampilan interaktif berbasis animasi orbit. Dibuat menggunakan React, Vite, Tailwind, dan Framer Motion.
            </p>
        </motion.div>
        </div>
    );
}

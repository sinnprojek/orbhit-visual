// src/components/ParticleBackground.jsx

import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine) => {
        // Inisialisasi mesin tsparticles
        await loadSlim(engine);
    }, []);

    // Opsi konfigurasi untuk partikel. Anda bisa bereksperimen dengan nilai-nilai ini.
    const particleOptions = {
        background: {
        color: {
            value: "#0a0f1d", // Warna background utama, sesuaikan dengan tema Anda
        },
        },
        fpsLimit: 60,
        interactivity: {
        events: {
            onHover: {
            enable: true,
            mode: "repulse", // Partikel akan menjauh saat mouse mendekat
            },
            resize: true,
        },
        modes: {
            repulse: {
            distance: 100,
            duration: 0.4,
            },
        },
        },
        particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: false, // Matikan garis penghubung antar partikel
            opacity: 0.1,
            width: 1,
        },
        collisions: {
            enable: true,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
            default: "out",
            },
            random: true,
            speed: 0.5, // Kecepatan gerak partikel
            straight: false,
        },
        number: {
            density: {
            enable: true,
            area: 800,
            },
            value: 120, // Jumlah partikel
        },
        opacity: {
            value: { min: 0.1, max: 0.5 },
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 3 }, // Ukuran partikel bervariasi
        },
        },
        detectRetina: true,
    };

    return (
        <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
        className="absolute top-0 left-0 w-full h-full -z-10" // <-- Styling penting
        />
    );
}
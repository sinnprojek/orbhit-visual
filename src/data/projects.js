// src/data/projects.js


export const projects = [
    {
        id: 1,
        title: 'Cosmic Voyager',
        description: 'Sebuah eksplorasi visual tata surya yang interaktif.',
        // Ganti path lokal dengan URL dari Unsplash dengan kata kunci 'space,planet'
        thumbnail: 'https://picsum.photos/seed/voyager/800/600',
        detailedDescription: 'Cosmic Voyager adalah aplikasi web yang dibuat dengan React dan Three.js untuk memberikan pengalaman imersif menjelajahi planet-planet di tata surya kita. Saya bertanggung jawab untuk membangun semua komponen UI dan mengintegrasikan model 3D.',
        technologies: ['React', 'Vite', 'Three.js', 'Tailwind CSS'],
        liveUrl: '#',
        repoUrl: '#'
    },
    {
        id: 2,
        title: 'Starlight Analytics',
        description: 'Dashboard untuk visualisasi data dari teleskop angkasa.',
        // Ganti dengan kata kunci 'data,analytics,abstract'
        thumbnail: 'https://picsum.photos/seed/analytics/800/600',
        detailedDescription: 'Platform ini dirancang untuk para peneliti agar dapat dengan mudah menganalisis dan memvisualisasikan data yang diterima dari teleskop. Saya fokus pada pembuatan grafik yang responsif dan performa tinggi menggunakan Recharts.',
        technologies: ['React', 'TypeScript', 'Recharts', 'Firebase'],
        liveUrl: '#',
        repoUrl: '#'
    },
    {
        id: 3,
        title: 'Galactic Threads',
        description: 'Toko online untuk merchandise bertema luar angkasa.',
        // Ganti dengan kata kunci 'neon,lines,technology'
        thumbnail: 'https://picsum.photos/seed/threads/800/600',
        detailedDescription: 'Sebuah situs e-commerce lengkap dengan fitur keranjang belanja, checkout, dan manajemen produk. Dibangun dengan arsitektur full-stack menggunakan Node.js untuk backend.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
        liveUrl: '#',
        repoUrl: '#'
    },
];
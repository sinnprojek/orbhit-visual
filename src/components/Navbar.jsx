import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 50);
            setIsVisible(y > 100);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = (sectionId) => {
        setIsOpen(false);
        const section = document.getElementById(sectionId);
        const isHomePage = location.pathname === "/";

        if (isHomePage) {
            if (section) section.scrollIntoView({ behavior: "smooth" });
        } else {
            if (sectionId === "gallery") navigate("/gallery");
            else navigate("/");
        }
    };

    const navItems = [
        { name: "Beranda", id: "home", path: "/" },
        { name: "Tentang", id: "about", path: "/" },
        { name: "Karya", id: "gallery", path: "/gallery" },
        { name: "Kontak", id: "contact", path: "/" },
    ];

    const isHomePage = location.pathname === "/";

    return (
        <nav
            className={`fixed w-full z-50 font-['Poppins'] transition-all duration-500 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            } ${
                scrolled || isOpen
                    ? "bg-[#0b0e1a]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                    : "bg-transparent shadow-none"
            }`}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-white">
                {/* Logo */}
                <Link to="/">
                    <motion.img
                        src="/Logo_Only.png"
                        alt="Orbhit Logo"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="h-9 md:h-10 w-auto cursor-pointer drop-shadow-[0_0_10px_rgba(255,200,100,0.25)]"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-10 text-sm font-medium">
                    {navItems.map((item) => (
                        <motion.button
                            key={item.id}
                            onClick={() =>
                                isHomePage
                                    ? handleScroll(item.id)
                                    : (location.href = item.path)
                            }
                            whileHover={{ scale: 1.08 }}
                            className="relative transition-all duration-300 group"
                        >
                            <span className="text-gray-300 group-hover:text-[#ffb347]">
                                {item.name}
                            </span>
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-[#f6d68a] to-[#ffb347] transition-all duration-300 group-hover:w-full"></span>
                        </motion.button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 left-0 w-full pt-20 bg-[#0b0e1a]/95 backdrop-blur-md border-t border-[#ffb347]/30 md:hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                    >
                        <div className="flex flex-col items-center py-6 space-y-5">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() =>
                                        isHomePage
                                            ? handleScroll(item.id)
                                            : (location.href = item.path)
                                    }
                                    whileTap={{ scale: 0.95 }}
                                    className="text-gray-200 text-lg hover:text-[#ffb347] transition-colors duration-300"
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
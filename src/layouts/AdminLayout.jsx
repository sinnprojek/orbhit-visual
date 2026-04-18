import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Images, LogOut, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLayout() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navLinkClasses = ({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 
        ${isActive
            ? 'bg-gradient-to-r from-[#ffb347]/20 to-[#f6d68a]/20 text-[#f6d68a] shadow-[0_0_10px_#ffb34740]'
            : 'text-gray-400 hover:text-[#ffb347]'
        }`;

    const handleLogout = () => {
        sessionStorage.removeItem('adminPassword');
        toast.success('You have successfully logged out.');
        navigate('/');
    };

    return (
        <div className="min-h-screen w-full flex bg-[#0b0f1e] text-white overflow-hidden">

            {/* SIDEBAR */}
            <aside
                className={`fixed top-0 left-0 h-full w-60 border-r border-[#ffb347]/30 
                bg-gradient-to-b from-[#111a2e]/90 to-[#0c1221]/90 backdrop-blur-md 
                shadow-[inset_0_0_20px_rgba(255,179,71,0.15)] z-50 transform 
                transition-transform duration-300 
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 flex flex-col`}
            >
                {/* HEADER */}
                <div className="h-16 flex items-center justify-between border-b border-[#ffb347]/20 px-4 flex-shrink-0">
                    <Link 
                        to="/admin/dashboard" 
                        className="font-bold text-lg bg-gradient-to-r from-[#f6d68a] via-[#ffb347] to-[#e8c48f] bg-clip-text text-transparent"
                        onClick={() => setSidebarOpen(false)}
                    >
                        Admin Panel
                    </Link>
                    {/* Close Button (Mobile Only) */}
                    <button 
                        onClick={() => setSidebarOpen(false)} 
                        className="md:hidden text-gray-400 hover:text-[#ffb347]"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* NAVIGATION */}
                <nav className="flex-1 flex flex-col gap-2 mt-6 px-4 overflow-y-auto">
                    <NavLink to="/admin/dashboard" className={navLinkClasses} onClick={() => setSidebarOpen(false)}>
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin/works" className={navLinkClasses} onClick={() => setSidebarOpen(false)}>
                        <Images className="h-5 w-5" />
                        Projects
                    </NavLink>
                </nav>

                {/* FOOTER / LOGOUT (tetap di bawah) */}
                <div className="p-4 border-t border-red-500/30 flex-shrink-0">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-3 w-full px-4 py-2 rounded-xl 
                        bg-gradient-to-r from-red-800/30 to-red-600/30 text-gray-300
                        hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 
                        hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] transition-all duration-300"
                    >
                        <LogOut className="h-5 w-5 text-red-400" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* OVERLAY (Mobile) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* MAIN CONTENT */}
            <main className="flex-1 ml-0 md:ml-60 overflow-y-auto h-screen bg-gradient-to-b from-[#0c1221] via-[#0b0f1e] to-[#080b14]">
                {/* Header untuk mobile */}
                <div className="flex items-center justify-between md:hidden px-6 py-4 border-b border-[#ffb347]/20">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-300 hover:text-[#ffb347]">
                        <Menu size={22} />
                    </button>
                    <h1 className="text-lg font-semibold bg-gradient-to-r from-[#f6d68a] to-[#ffb347] bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                    <div className="w-6" /> {/* Spacer */}
                </div>

                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'; // For animations
import { KeyRound } from 'lucide-react'; // Icon
import ParticleBackground from '@/components/ParticleBackground';

const API_LOGIN_URL = `${import.meta.env.VITE_API_URL}/api/login`;

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!password) {
            toast.error('Please enter the access key.');
            return;
        }

        setIsLoggingIn(true);
        const toastId = toast.loading('Authenticating...');

        try {
            const response = await fetch(API_LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: password }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                sessionStorage.setItem('adminPassword', password);
                toast.success('Authentication successful!', { id: toastId });
                navigate('/admin/dashboard');
            } else {
                throw new Error(result.message || 'The access key entered is incorrect.');
            }
        } catch (error) {
            toast.error(error.message, { id: toastId });
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white flex items-center justify-center p-4 relative overflow-hidden">
            <ParticleBackground />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,80,0.1),rgba(0,0,0,0)_70%)] blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-sm"
            >
                <form 
                    onSubmit={handleLogin} 
                    className="bg-black/20 backdrop-blur-md border border-[#ffb347]/30 p-8 rounded-2xl shadow-2xl shadow-amber-500/10"
                >
                    <div className="text-center mb-6">
                        <div className="inline-block p-3 bg-gray-800/50 rounded-full border border-gray-700">
                            <KeyRound className="h-8 w-8 text-[#ffb347]" />
                        </div>
                    </div>
                    
                    <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-[#e8c48f] to-[#ffb347] bg-clip-text text-transparent">
                        Admin Access Panel
                    </h1>
                    
                    <div className="mb-4 relative">
                        <label htmlFor="password-input" className="block mb-2 text-sm font-medium text-gray-400">
                            Secure Key
                        </label>
                        <KeyRound className="absolute left-3 top-10 h-5 w-5 text-gray-500 pointer-events-none" />
                        <input 
                            id="password-input"
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="••••••••" 
                            className="w-full p-2 pl-10 rounded bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ffb347] transition-all" 
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full mt-6 p-3 rounded-lg font-semibold bg-gradient-to-r from-[#ffb347] to-[#e8c48f] text-black hover:shadow-[0_0_20px_rgba(255,200,100,0.4)] transition-shadow duration-300"
                    >
                        Authenticate
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
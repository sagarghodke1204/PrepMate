import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';
import { useAuth } from '../../AuthContext'; // --- IMPORT AUTH HOOK
import { supabase } from '../../supabase'; // --- IMPORT SUPABASE

const Header = ({ navigateTo, currentPage }) => {
    const [scrolled, setScrolled] = useState(false);
    const { user } = useAuth(); // --- GET THE USER

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        if (currentPage !== 'home') {
            navigateTo('home');
            setTimeout(() => {
                document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', 'block': 'start' });
            }, 100);
        } else {
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', 'block': 'start' });
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigateTo('home');
    };

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-0'}`}>
            <div
                className={`
                    flex justify-between items-center transition-all duration-500 ease-in-out
                    mx-auto px-6 
                    ${scrolled
                    ? 'max-w-6xl py-4 bg-black/30 backdrop-blur-lg border border-gray-700 rounded-2xl'
                    : 'container py-4'
                }
                `}
            >
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="flex items-center gap-2 cursor-pointer">
                    <UserCheck
                        className="text-cyan-400 transition-all duration-300"
                        size={scrolled ? 24 : 32}
                    />
                    <span
                        className={`font-bold text-white transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl'}`}
                    >
                        EchoHire AI
                    </span>
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="hover:text-cyan-400 transition-colors">Features</a>
                    <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')} className="hover:text-cyan-400 transition-colors">Testimonials</a>
                    <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="hover:text-cyan-400 transition-colors">Pricing</a>
                    <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-cyan-400 transition-colors">FAQ</a>
                </nav>

                {/* --- NEW AUTH BUTTON LOGIC --- */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="hidden sm:inline text-gray-300">
                                Hi, {user.user_metadata?.full_name?.split(' ')[0]}
                            </span>
                            <motion.button
                                onClick={handleSignOut}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                            >
                                Logout
                            </motion.button>
                        </>
                    ) : (
                        <motion.button
                            onClick={() => navigateTo('login')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-lg shadow-cyan-500/20"
                        >
                            Login / Sign Up
                        </motion.button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
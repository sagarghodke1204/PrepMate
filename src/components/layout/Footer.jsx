import React from 'react';
import { UserCheck, Youtube, Github, Linkedin } from 'lucide-react';

const Footer = ({ navigateTo }) => {

    // This helper function ensures footer links
    // always go to the homepage before scrolling.
    const handleFooterNavClick = (e, targetId) => {
        e.preventDefault();
        navigateTo('home');

        // We need a short delay to wait for the page
        // transition to 'home' before we can scroll.
        setTimeout(() => {
            document.getElementById(targetId)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };

    return (
        <footer className="border-t border-white/10 py-16">
            <div className="container mx-auto px-6">

                {/* --- Top Section: 3-Column Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Column 1: Brand */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
                            className="flex items-center gap-2 cursor-pointer mb-4"
                        >
                            <UserCheck className="text-cyan-400" size={28} />
                            <span className="text-xl font-bold text-white">EchoHire AI</span>
                        </a>
                        <p className="text-sm text-gray-400 max-w-xs">
                            Your personal AI interview coach. Practice with AI, land the job.
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <nav className="flex flex-col items-center md:items-start gap-3">
                        <h3 className="text-lg font-semibold text-white mb-2">Navigate</h3>
                        <a
                            href="#features"
                            onClick={(e) => handleFooterNavClick(e, 'features')}
                            className="text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#testimonials"
                            onClick={(e) => handleFooterNavClick(e, 'testimonials')}
                            className="text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                            Testimonials
                        </a>
                        <a
                            href="#faq"
                            onClick={(e) => handleFooterNavClick(e, 'faq')}
                            className="text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                            FAQ
                        </a>
                    </nav>

                    {/* Column 3: Socials */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold text-white mb-2">Connect</h3>
                        <div className="flex items-center gap-5">
                            <a
                                href="https://youtube.com" // TODO: Add your channel link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-cyan-400 transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube size={24} />
                            </a>
                            <a
                                href="https://github.com" // TODO: Add your GitHub link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-cyan-400 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github size={24} />
                            </a>
                            <a
                                href="https://linkedin.com" // TODO: Add your LinkedIn link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-cyan-400 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* --- Bottom Section: Copyright --- */}
                <div className="border-t border-white/10 mt-12 pt-8 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} EchoHire AI. All Rights Reserved.
                    </p>
                    {/* This was </D>, now it is </p> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
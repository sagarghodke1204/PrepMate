import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORT OUR NEW AUTH HOOK ---
import { useAuth } from './AuthContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AnimatedGradientBackground from './components/ui/AnimatedGradientBackground';

// Pages
import HomePage from './pages/HomePage';
import DemoRequestPage from './pages/DemoRequestPage';
import ReportPage from './pages/ReportPage';
import Dashboard from './pages/Dashboard';
import InterviewSetup from './pages/InterviewSetup';
import LiveInterview from './pages/LiveInterview';
import LoginPage from './pages/LoginPage'; // --- IMPORT NEW LOGIN PAGE

import { reportData } from './data/mockData.jsx';

const App = () => {
    const { user, loading } = useAuth(); // --- GET USER STATE ---

    // --- Define our protected and public pages ---
    const protectedPages = ['dashboard', 'setup', 'live'];
    const publicPages = ['home', 'demo', 'report'];

    const getPageFromUrl = () => {
        const path = window.location.pathname.substring(1).toLowerCase();
        if (path === 'liveinterview') return 'live';
        if (path === 'interviewsetup') return 'setup';

        const allPages = [...publicPages, ...protectedPages, 'login'];
        if (allPages.includes(path)) return path;

        return 'home';
    };

    const [currentPage, setCurrentPage] = useState(getPageFromUrl());

    const navigateTo = (page) => {
        window.history.pushState(null, '', `/${page}`);
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const handlePopState = () => setCurrentPage(getPageFromUrl());
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // --- NEW ROUTING LOGIC ---
    useEffect(() => {
        if (loading) return; // Wait until auth state is confirmed

        const isProtected = protectedPages.includes(currentPage);

        if (user && currentPage === 'login') {
            // User is logged in but on the login page -> redirect to dashboard
            navigateTo('dashboard');
        } else if (!user && isProtected) {
            // User is NOT logged in and trying to access a protected page -> redirect to login
            navigateTo('login');
        }

    }, [currentPage, user, loading]);

    // --- Show a loading screen while auth is checked ---
    if (loading) {
        return (
            <div className="bg-[#0D0C22] min-h-screen flex items-center justify-center">
                <p className="text-white text-2xl">Loading...</p>
            </div>
        );
    }

    const showHeaderFooter = currentPage !== 'live' && currentPage !== 'login';

    const renderPage = () => {
        // Final check to prevent flashing protected content
        if (!user && protectedPages.includes(currentPage)) {
            return <LoginPage />;
        }

        switch (currentPage) {
            case 'home':
                return <HomePage navigateTo={navigateTo} />;
            case 'demo':
                return <DemoRequestPage navigateTo={navigateTo} />;
            case 'report':
                return <ReportPage report={reportData} />;
            case 'dashboard':
                return <Dashboard navigateTo={navigateTo} />;
            case 'setup':
                return <InterviewSetup navigateTo={navigateTo} />;
            case 'live':
                return <LiveInterview navigateTo={navigateTo} />;
            case 'login':
                return <LoginPage />;
            default:
                return <HomePage navigateTo={navigateTo} />;
        }
    };

    return (
        <div className="bg-[#0D0C22] text-gray-200 font-sans antialiased">
            <AnimatedGradientBackground />
            <div className="relative z-10 min-h-screen flex flex-col">
                {showHeaderFooter && <Header navigateTo={navigateTo} currentPage={currentPage} />}
                <main className="flex-grow">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {renderPage()}
                        </motion.div>
                    </AnimatePresence>
                </main>
                {showHeaderFooter && <Footer navigateTo={navigateTo} />}
            </div>
        </div>
    );
};

export default App;
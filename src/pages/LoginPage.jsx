import React from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabase'; // Import Supabase client

const LoginPage = () => {
    const handleGoogleSignIn = async () => {
        try {
            // Supabase's Google Sign-in
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };

    return (
        <section className="py-24 md:py-32">
            <div className="container mx-auto px-6 max-w-lg text-center">
                <motion.div
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl font-bold text-white mb-4">Welcome!</h1>
                    <p className="text-gray-400 mb-8">
                        Please sign in to access your dashboard and start practicing.
                    </p>
                    <motion.button
                        onClick={handleGoogleSignIn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg"
                    >
                        Sign In with Google
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default LoginPage;
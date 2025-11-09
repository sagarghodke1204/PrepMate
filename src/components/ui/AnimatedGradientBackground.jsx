import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGradientBackground = () => (
    <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0D0C22]">
            <motion.div
                animate={{ x: ['-20%', '20%', '-20%'], y: ['-50%', '50%', '-50%'], rotate: [0, 180, 0] }}
                transition={{ duration: 40, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-green-600/30 via-cyan-500/30 to-transparent rounded-full filter blur-3xl opacity-50"
            />
            <motion.div
                animate={{ x: ['20%', '-20%', '20%'], y: ['50%', '-50%', '50%'], rotate: [180, 0, 180] }}
                transition={{ duration: 50, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-bl from-teal-500/30 via-blue-500/30 to-transparent rounded-full filter blur-3xl opacity-40"
            />
        </div>
    </div>
);

export default AnimatedGradientBackground;
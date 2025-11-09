import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedCard = ({ children, className = '', whileHover = { scale: 1.02, transition: { duration: 0.3 } } }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) controls.start('visible');
    }, [controls, inView]);

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={cardVariants}
            whileHover={whileHover}
            className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedCard;
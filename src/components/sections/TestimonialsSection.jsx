import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonialsData } from '../../data/mockData.jsx';

// --- Configuration for the marquee ---
const CARD_WIDTH_PX = 350; // w-[350px]
const GAP_PX = 32; // gap-8 (2rem = 32px)

// --- Reusable Row Component ---
const MarqueeRow = ({ items, direction }) => {
    const controls = useAnimation();
    const totalWidth = items.length * (CARD_WIDTH_PX + GAP_PX);
    const duration = items.length * 8;

    const animationProps = {
        x: direction === 'left' ? -totalWidth : 0,
        transition: {
            ease: 'linear',
            duration: duration,
            repeat: Infinity,
        }
    };

    const initialProps = {
        x: direction === 'left' ? 0 : -totalWidth
    };

    useEffect(() => {
        controls.start(animationProps);
    }, [controls, animationProps]);

    return (
        <div
            onMouseEnter={() => controls.stop()}
            onMouseLeave={() => controls.start(animationProps)}
        >
            <motion.div
                className="flex gap-8"
                initial={initialProps}
                animate={controls}
            >
                {[...items, ...items].map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} />
                ))}
            </motion.div>
        </div>
    );
};

// --- Card Component (LAYOUT UPDATED) ---
const TestimonialCard = ({ testimonial }) => (
    <div
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 flex-none"
        style={{ width: `${CARD_WIDTH_PX}px` }}
    >
        {/* We use flex-col and h-full to make the footer (stars) sticky to the bottom */}
        <div className="flex flex-col h-full">

            {/* --- TOP SECTION (Avatar + Name) --- */}
            <div className="flex items-center gap-4 mb-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
                </div>
            </div>

            {/* --- REVIEW SECTION (Grows to fill space) --- */}
            <p className="text-gray-300 mb-4 flex-grow">
                "{testimonial.quote}"
            </p>

            {/* --- BOTTOM SECTION (Stars on the right) --- */}
            {/* mt-auto pushes this to the bottom */}
            {/* justify-end pushes the stars to the right */}
            <div className="flex justify-end mt-auto">
                <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-current" size={20} />)}
                </div>
            </div>

        </div>
    </div>
);

// --- Main Section Component ---
const TestimonialsSection = () => (
    <section id="testimonials" className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white">Hear From Students Like You</h2>
            </div>
        </div>

        <div
            className="w-full overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
            <MarqueeRow items={testimonialsData} direction="right" />
        </div>
    </section>
);

export default TestimonialsSection;
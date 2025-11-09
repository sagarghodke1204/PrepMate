import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, Upload, Bot, ClipboardCheck } from 'lucide-react';

// --- NEW COMPONENT FOR SEQUENTIAL TYPING ---
const SequentialTypingHeadings = () => {
    // --- H1 ---
    const baseText1 = "Ace Your Next Tech Interview.";
    const count1 = useMotionValue(0);
    const rounded1 = useTransform(count1, (latest) => Math.round(latest));
    const displayText1 = useTransform(rounded1, (latest) => baseText1.slice(0, latest));

    // --- H2 ---
    const baseText2 = "Practice with AI, Land the Job.";
    const count2 = useMotionValue(0);
    const rounded2 = useTransform(count2, (latest) => Math.round(latest));
    const displayText2 = useTransform(rounded2, (latest) => baseText2.slice(0, latest));

    // --- Cursor State ---
    const [showH1Cursor, setH1Cursor] = useState(false);
    const [showH2Cursor, setH2Cursor] = useState(false);

    useEffect(() => {
        let controls;
        let isActive = true;

        const sequence = async () => {
            while (isActive) {
                // --- Reset ---
                count1.set(0);
                count2.set(0);
                setH2Cursor(false);
                setH1Cursor(true);

                // 1. Type H1
                controls = animate(count1, baseText1.length, { duration: 2, ease: "easeInOut", delay: 0.5 });
                await controls.finished;
                if (!isActive) break;

                // 2. Switch cursors
                setH1Cursor(false);
                setH2Cursor(true);

                // 3. Type H2
                controls = animate(count2, baseText2.length, { duration: 2, ease: "easeInOut", delay: 0.5 });
                await controls.finished;
                if (!isActive) break;

                // 4. Pause at the end
                setH2Cursor(false);
                await new Promise(r => setTimeout(r, 3000));
                if (!isActive) break;

                // 5. Delete H2
                controls = animate(count2, 0, { duration: 1.5, ease: "easeInOut" });
                await controls.finished;
                if (!isActive) break;

                // 6. Delete H1
                controls = animate(count1, 0, { duration: 1.5, ease: "easeInOut" });
                await controls.finished;
                if (!isActive) break;

                // 7. Pause before loop
                await new Promise(r => setTimeout(r, 1000));
                if (!isActive) break;
            }
        };
        sequence();

        return () => {
            isActive = false;
            if (controls) controls.stop();
        };
    }, [count1, count2, baseText1.length, baseText2.length]);

    // Blinking cursor component
    const BlinkingCursor = ({ className = '' }) => (
        <motion.span
            className={`inline-block w-1 ml-2 ${className}`}
            style={{ height: '0.9em', opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
            &nbsp;
        </motion.span>
    );

    return (
        <div>
            {/* --- H1 --- */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight h-24 md:h-32">
                <motion.span
                    className="text-transparent bg-clip-text"
                    style={{
                        backgroundImage: 'linear-gradient(to right, #2dd4bf, #06b6d4, #0ea5e9)',
                    }}
                >
                    {displayText1}
                </motion.span>
                {showH1Cursor && (
                    <BlinkingCursor className="bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400" />
                )}
            </h1>

            {/* --- H2 --- */}
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-2 h-20 md:h-24">
                <motion.span>
                    {displayText2}
                </motion.span>
                {showH2Cursor && (
                    <BlinkingCursor className="bg-white" />
                )}
            </h2>
        </div>
    );
};


// --- Demo Animation Component (Unchanged) ---
const InterviewDemoAnimation = () => {
    const [step, setStep] = useState(0);
    const steps = [
        { icon: <Upload size={24} className="text-cyan-400" />, text: "Upload Your Resume" },
        { icon: <Bot size={24} className="text-cyan-400" />, text: "Start the AI Interview" },
        { icon: <ClipboardCheck size={24} className="text-cyan-400" />, text: "Get Instant Feedback" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prevStep) => (prevStep + 1) % steps.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [steps.length]);

    return (
        <div className="relative h-16 w-full max-w-sm mx-auto mb-10 overflow-hidden rounded-lg bg-black/20 p-4 border border-white/10 backdrop-blur-sm">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center gap-4"
                >
                    {steps[step].icon}
                    <span className="text-lg font-medium text-white">{steps[step].text}</span>
                </motion.div>
            </AnimatePresence> {/* <-- THIS IS THE CORRECTED LINE */}
        </div>
    );
};


// --- Hero Section (Now includes the single SequentialTypingHeadings) ---
const HeroSection = ({ navigateTo }) => (
    <section className="py-24 md:py-32 text-center">
        <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

                {/* --- THIS IS THE NEW SEQUENTIAL COMPONENT --- */}
                <SequentialTypingHeadings />

            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-3xl mx-auto mt-6 text-lg text-gray-400"
            >
                Feeling nervous? Get confident by practicing with our AI interviewer.
                It asks real questions based on your resume and gives you instant, detailed feedback so you're ready for the real thing.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12"
            >
                <InterviewDemoAnimation />
            </motion.div>

            {/* Buttons (Unchanged) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
            >
                <motion.button onClick={() => navigateTo('dashboard')}
                               whileHover={{ scale: 1.05, boxShadow: '0px 0px 20px rgba(22, 163, 165, 0.5)' }} whileTap={{ scale: 0.95 }}
                               className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
                >
                    Start a Practice Interview
                </motion.button>
                <motion.a href="#" onClick={(e) => { e.preventDefault(); navigateTo('report'); }}
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 font-semibold text-white hover:text-cyan-300 transition-colors"
                >
                    See Sample Feedback <ArrowRight size={20} />
                </motion.a>
            </motion.div>
        </div>
    </section>
);

export default HeroSection;
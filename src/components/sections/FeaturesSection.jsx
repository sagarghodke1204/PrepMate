import React from 'react';
import { motion } from 'framer-motion';
import { Code, BarChart, MessageSquare, Briefcase } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard.jsx';

const FeaturesSection = () => (
    // Reduced padding from py-24 to py-16
    <section id="features" className="py-16">
        <div className="container mx-auto px-6">
            {/* Reduced margin from mb-16 to mb-12 */}
            <div className="text-center mb-12">
                {/* Reduced text size from 4xl/5xl to 3xl/4xl */}
                <h2 className="text-3xl md:text-4xl font-bold text-white">The Modern Technical Interview</h2>
                <p className="max-w-xl mx-auto mt-4 text-gray-400">Go beyond resumes and screen candidates for the skills that truly matter.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatedCard className="md:col-span-2">
                    <div className="flex flex-col h-full"><Code size={32} className="text-purple-400 mb-4" />
                        {/* Reduced text size from 2xl to xl */}
                        <h3 className="text-xl font-bold mb-2">Realistic Coding Challenges</h3>
                        <p className="text-gray-400 mb-4 flex-grow">Go beyond algorithmic puzzles. Our AI presents real-world problems and evaluates solutions for efficiency, readability, and best practices.</p>
                        {/* Reduced height from h-32 to h-24 */}
                        <div className="mt-auto h-24 bg-gray-900/50 rounded-lg p-4 font-mono text-sm text-gray-400 overflow-hidden">
                            <p><span className="text-purple-400">function</span> <span className="text-yellow-300">optimizeQuery</span>(<span className="text-cyan-400">query</span>) {'{'}</p>
                            <p>  <span className="text-gray-500">// AI analyzes the candidate's solution here...</span></p>
                            <p>  <span className="text-pink-400">return</span> optimizedResult;</p>
                            <p>{'}'}</p>
                        </div>
                    </div>
                </AnimatedCard>
                <AnimatedCard>
                    <div className="flex flex-col h-full"><BarChart size={32} className="text-green-400 mb-4" />
                        {/* Reduced text size from 2xl to xl */}
                        <h3 className="text-xl font-bold mb-2">Deep Technical Analysis</h3>
                        <p className="text-gray-400 flex-grow">Get a multi-faceted view of a candidate's skills, from system design to language proficiency.</p>
                        {/* Reduced height from h-24 to h-20 */}
                        <div className="mt-auto h-20 flex items-end gap-2">
                            <motion.div initial={{height: '10%'}} whileInView={{height: '75%'}} transition={{duration: 1}} className="w-1/4 bg-green-500 rounded-t-sm" title="Problem Solving"></motion.div>
                            <motion.div initial={{height: '10%'}} whileInView={{height: '60%'}} transition={{duration: 1, delay: 0.1}} className="w-1/4 bg-green-500 rounded-t-sm" title="Code Quality"></motion.div>
                            <motion.div initial={{height: '10%'}} whileInView={{height: '85%'}} transition={{duration: 1, delay: 0.2}} className="w-1/4 bg-green-500 rounded-t-sm" title="Communication"></motion.div>
                            <motion.div initial={{height: '10%'}} whileInView={{height: '50%'}} transition={{duration: 1, delay: 0.3}} className="w-1/4 bg-green-500 rounded-t-sm" title="Testing"></motion.div>
                        </div>
                    </div>
                </AnimatedCard>
                <AnimatedCard>
                    <div className="flex flex-col h-full"><MessageSquare size={32} className="text-blue-400 mb-4" />
                        {/* Reduced text size from 2xl to xl */}
                        <h3 className="text-xl font-bold mb-2">Adaptive Conversation</h3>
                        <p className="text-gray-400 flex-grow">The AI interviewer asks relevant follow-up questions and probes for deeper understanding, just like a senior engineer would.</p>
                    </div>
                </AnimatedCard>
                <AnimatedCard className="md:col-span-2">
                    <div className="flex flex-col md:flex-row gap-8 h-full items-center">
                        <div className="flex-1"><Briefcase size={32} className="text-yellow-400 mb-4" />
                            {/* Reduced text size from 2xl to xl */}
                            <h3 className="text-xl font-bold mb-2">Integrate Your Workflow</h3>
                            <p className="text-gray-400">Pipe candidate scores and detailed reports directly into your existing Applicant Tracking System.</p>
                        </div>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <div className="p-3 bg-gray-900/60 rounded-full" title="Greenhouse"><svg role="img" width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#24A169" d="M21.58 10.45h-6.23V4.22c0-1.7-1.38-3.08-3.08-3.08S9.19 2.52 9.19 4.22v6.23H2.96c-1.7 0-3.08 1.38-3.08 3.08s1.38 3.08 3.08 3.08h6.23v5.47c0 .48.39.87.87.87h1.74a.87.87 0 00.87-.87v-5.47h6.23c1.7 0 3.08-1.38 3.08-3.08s-1.37-3.08-3.08-3.08z"/></svg></div>
                            <div className="p-3 bg-gray-900/60 rounded-full" title="Lever"><svg role="img" width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#F4A900" d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 19.2c-4 0-7.2-3.22-7.2-7.2S8 4.8 12 4.8s7.2 3.22 7.2 7.2-3.22 7.2-7.2 7.2z"/><path fill="#F4A900" d="M12 8.4a3.6 3.6 0 100 7.2 3.6 3.6 0 000-7.2z"/></svg></div>
                            <div className="p-3 bg-gray-900/60 rounded-full" title="Workday"><svg role="img" width="4D" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#004D94" d="M12.01 1.76c-3.79 0-6.83 2.92-6.83 6.52 0 1.95.9 3.68 2.27 4.86l4.56 3.86 4.56-3.86c1.37-1.18 2.27-2.91 2.27-4.86.01-3.6-3.03-6.52-6.83-6.52zm0 19.73c-3.15 0-5.7-2.42-5.7-5.41 0-1.62.74-3.06 1.89-4.04l3.81 3.21 3.81-3.21c1.15.98 1.89 2.42 1.89 4.04 0 2.99-2.55 5.41-5.7 5.41z"/></svg></div>
                        </div>
                    </div>
                </AnimatedCard>
            </div>
        </div>
    </section>
);

export default FeaturesSection;
import React from 'react';
import { motion } from 'framer-motion';
// REMOVED: import { reportData } from '../data/mockData';
import AnimatedCard from '../components/ui/AnimatedCard';

// It now receives 'report' as a prop from App.jsx
const ReportPage = ({ report }) => {
    // If no report is passed, add a fallback to prevent crashing
    if (!report) {
        return (
            <div className="text-center py-32 text-gray-400">
                No report data available.
            </div>
        );
    }

    return (
        <section className="py-24 md:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Candidate Insight Report</h1>
                    <p className="max-w-2xl mx-auto mt-4 text-gray-400">
                        Here is the actionable, in-depth analysis from your session.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-8">
                        <AnimatedCard>
                            <h2 className="text-xl font-bold text-white mb-4">Overall Score</h2>
                            <div className="text-center">
                                <div className="relative inline-flex items-center justify-center">
                                    <svg className="w-32 h-32 transform -rotate-90">
                                        <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="10" className="text-gray-700" fill="transparent" />
                                        <motion.circle
                                            cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="10"
                                            className="text-cyan-400" fill="transparent"
                                            strokeDasharray={2 * Math.PI * 54}
                                            initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                                            animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - report.overallScore / 100) }}
                                            transition={{ duration: 2, ease: "easeOut" }}
                                        />
                                    </svg>
                                    <span className="absolute text-4xl font-bold text-white">{report.overallScore}</span>
                                </div>
                                <p className="text-lg font-semibold text-cyan-400 mt-2">Strong Hire</p>
                            </div>
                        </AnimatedCard>
                        <AnimatedCard>
                            <h2 className="text-xl font-bold text-white mb-4">Interview Details</h2>
                            {/* All data now comes from the 'report' prop */}
                            <p className="font-bold text-white">{report.candidateName}</p>
                            <p className="text-gray-400">{report.role}</p>
                        </AnimatedCard>
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                        <AnimatedCard>
                            <h2 className="text-xl font-bold text-white mb-4">AI Summary</h2>
                            <p className="text-gray-300">{report.summary}</p>
                        </AnimatedCard>
                        <AnimatedCard>
                            <h2 className="text-xl font-bold text-white mb-4">Skills Breakdown</h2>
                            <div className="space-y-4">
                                {report.scores.map(item => (
                                    <div key={item.skill}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-base font-medium text-gray-300">{item.skill}</span>
                                            <span className="text-sm font-medium text-cyan-400">{item.score}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                                            <motion.div
                                                className="bg-cyan-500 h-2.5 rounded-full"
                                                initial={{ width: '0%'}}
                                                whileInView={{ width: `${item.score}%`}}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedCard>
                        <AnimatedCard>
                            <h2 className="text-xl font-bold text-white mb-4">Coding Challenge Analysis</h2>
                            <p className="text-gray-400 mb-2"><span className="font-semibold text-gray-200">Problem:</span> {report.codingChallenge.problem}</p>
                            <p className="text-gray-300">{report.codingChallenge.solutionAnalysis}</p>
                        </AnimatedCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReportPage;
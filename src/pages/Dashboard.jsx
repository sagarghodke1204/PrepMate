import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, BarChart, Clock } from 'lucide-react';
import AnimatedCard from '../components/ui/AnimatedCard';

// --- IMPORTS FOR SUPABASE ---
import { useAuth } from '../AuthContext';
import { supabase } from '../supabase';

const Dashboard = ({ navigateTo }) => {
    const { user } = useAuth(); // Get user

    // --- State for real interview history ---
    const [history, setHistory] = useState([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);

    // --- Effect to fetch history ---
    useEffect(() => {
        if (!user) return; // Wait for user

        const fetchHistory = async () => {
            setIsLoadingHistory(true);

            // Fetch from the 'interview_history' table
            const { data, error } = await supabase
                .from('interview_history')
                .select('*') // Get all columns
                .eq('user_id', user.id) // Only for our user
                .order('created_at', { ascending: false }); // Newest first

            if (data) {
                setHistory(data);
            }
            if (error) {
                console.error("Error fetching history: ", error);
            }
            setIsLoadingHistory(false);
        };

        fetchHistory();
    }, [user]); // Re-run if the user changes

    return (
        <section className="py-24 md:py-32">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
                    Welcome Back, {user?.user_metadata?.full_name?.split(' ')[0] || 'Student'}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- Card 1: Start New Interview --- */}
                    <motion.div
                        className="lg:col-span-1 cursor-pointer"
                        onClick={() => navigateTo('setup')}
                    >
                        <AnimatedCard
                            className="h-full flex flex-col items-center justify-center text-center border-2 border-cyan-500 border-dashed"
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                        >
                            <Plus size={48} className="text-cyan-400 mb-4" />
                            <h2 className="text-2xl font-bold text-white">
                                Start New Interview
                            </h2>
                            <p className="text-gray-400">Practice a new role or topic.</p>
                        </AnimatedCard>
                    </motion.div>

                    {/* --- Card 2: Interview History (NOW DYNAMIC) --- */}
                    <div className="lg:col-span-2">
                        <AnimatedCard className="h-full">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                Interview History
                            </h2>
                            <div className="space-y-4">
                                {isLoadingHistory ? (
                                    <p className="text-gray-400">Loading history...</p>
                                ) : history.length > 0 ? (
                                    // --- Map over real data ---
                                    history.map(item => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center p-4 bg-gray-900/50 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-semibold text-white">{item.role}</p>
                                                <p className="text-sm text-gray-400">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-cyan-400">{item.overall_score}%</p>
                                                <button
                                                    // TODO: This should navigate to a specific report: navigateTo(`/report/${item.id}`)
                                                    onClick={() => navigateTo('report')}
                                                    className="text-sm text-cyan-400 hover:underline"
                                                >
                                                    View Report
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">You haven't completed any interviews yet.</p>
                                )}
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Mic, Send, XCircle } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { supabase } from '../supabase';
import { reportData } from '../data/mockData.jsx'; // Using mock data for demo

// --- Reusable Chat Message Components ---
const AIMessage = ({ text }) => (
    <motion.div
        className="flex gap-3 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <div className="w-10 h-10 bg-cyan-500 rounded-full flex-shrink-0 flex items-center justify-center">
            <Bot size={20} className="text-white" />
        </div>
        <div className="p-4 bg-gray-800 rounded-lg rounded-tl-none">
            <p className="text-gray-200">{text}</p>
        </div>
    </motion.div>
);

const UserMessage = ({ text }) => (
    <motion.div
        className="flex gap-3 mb-6 justify-end"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <div className="p-4 bg-blue-600 rounded-lg rounded-tr-none">
            <p className="text-white">{text}</p>
        </div>
    </motion.div>
);
// ----------------------------------------

const LiveInterview = ({ navigateTo }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([
        { from: 'ai', text: "Welcome to your AI interview. I've analyzed your resume and I see you worked on a project called 'AmchiBus'. Can you tell me about the technical challenges you faced?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() === "") return;

        setMessages(prev => [...prev, { from: 'user', text: input }]);
        setInput("");

        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                { from: 'ai', text: "That's interesting. You mentioned using Spring Boot. What are the advantages of using Spring Boot for a REST API? [Placeholder]" }
            ]);
        }, 1500);
    };

    const handleEndInterview = async () => {
        if (!user) {
            navigateTo('report');
            return;
        }

        // --- Save to Supabase 'interview_history' table ---
        // (In a real app, you'd build this report object)
        const newReport = {
            // user_id is set automatically by the default value
            role: "Frontend Developer (Demo)",
            overall_score: reportData.overallScore,
            report_summary: reportData.summary
        };

        try {
            const { error } = await supabase
                .from('interview_history')
                .insert(newReport);

            if (error) throw error;

        } catch (error) {
            console.error("Error saving interview history: ", error);
        }

        navigateTo('report');
    };

    return (
        <div className="w-full h-screen flex flex-col p-4 md:p-8">

            {/* --- Top Bar --- */}
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">Live Interview</h1>
                <motion.button
                    onClick={handleEndInterview}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    <XCircle size={20} />
                    End Interview
                </motion.button>
            </div>

            {/* --- Chat Window --- */}
            <div className="flex-grow bg-black/20 border border-gray-700 rounded-lg p-6 overflow-y-auto mb-4">
                {messages.map((msg, index) => (
                    msg.from === 'ai'
                        ? <AIMessage key={index} text={msg.text} />
                        : <UserMessage key={index} text={msg.text} />
                ))}
            </div>

            {/* --- Input Area --- */}
            <div className="flex-shrink-0 flex gap-4">
                <motion.button whileHover={{ scale: 1.05 }} className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg">
                    <Mic size={24} className="text-white" />
                </motion.button>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your answer here..."
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg py-3 px-4 focus:outline-none focus:border-cyan-500"
                />
                <motion.button
                    onClick={handleSend}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-cyan-500 hover:bg-cyan-600 rounded-lg"
                >
                    <Send size={24} className="text-white" />
                </motion.button>
            </div>
        </div>
    );
};

export default LiveInterview;
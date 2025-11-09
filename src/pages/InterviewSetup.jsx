import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Code, Brain, Server, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import AnimatedCard from '../components/ui/AnimatedCard';
import { useAuth } from '../AuthContext';
import { supabase } from '../supabase';

const InterviewSetup = ({ navigateTo }) => {
    const { user } = useAuth();

    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success', 'error'
    const [error, setError] = useState('');

    const [existingResume, setExistingResume] = useState(null);
    const [isLoadingResume, setIsLoadingResume] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchUserResume = async () => {
            // Fetch from the 'profiles' table
            const { data, error } = await supabase
                .from('profiles')
                .select('resume_url, resume_name')
                .eq('id', user.id) // Find the row for our user
                .single(); // We only expect one row

            if (data && data.resume_url) {
                setExistingResume({ name: data.resume_name, url: data.resume_url });
            }
            setIsLoadingResume(false);
        };

        fetchUserResume();
    }, [user]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUploadStatus('idle');
            setExistingResume(null); // Clear existing resume view if new one is selected
            setError('');
        }
    };

    const handleUpload = async () => {
        if (!file || !user) {
            setError('Please select a file.');
            return;
        }

        setUploadStatus('uploading');
        const fileExt = file.name.split('.').pop();
        const filePath = `${user.id}/${new Date().getTime()}.${fileExt}`;

        // 1. Upload the file to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('resumes') // The bucket we created
            .upload(filePath, file, {
                // Not using onUploadProgress, as it's less reliable for small files
            });

        // Show indeterminate progress
        setUploadProgress(50); // Simulating progress

        if (uploadError) {
            setError('Upload failed. Please try again.');
            setUploadStatus('error');
            console.error("Upload error: ", uploadError);
            return;
        }

        setUploadProgress(100);

        // 2. Get the public URL of the uploaded file
        const { data: urlData } = supabase.storage
            .from('resumes')
            .getPublicUrl(filePath);

        const publicUrl = urlData.publicUrl;

        // 3. Save the URL to our 'profiles' database table
        // We use .upsert() - it creates the row if it doesn't exist, or updates it if it does.
        const { error: dbError } = await supabase
            .from('profiles')
            .upsert({
                id: user.id, // Specify the id to upsert on
                resume_url: publicUrl,
                resume_name: file.name,
                updated_at: new Date()
            })
            .eq('id', user.id); // Match the row

        if (dbError) {
            setError('Failed to save resume. Please try again.');
            setUploadStatus('error');
            console.error("DB error: ", dbError);
            return;
        }

        // Success!
        setUploadStatus('success');
        setExistingResume({ name: file.name, url: publicUrl });
    };

    // --- Helper to show upload UI state ---
    const renderUploadState = () => {
        switch (uploadStatus) {
            case 'uploading':
                return (
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <motion.div
                            className="bg-cyan-500 h-2.5 rounded-full"
                            initial={{ width: '0%'}}
                            animate={{ width: `${uploadProgress}%`}}
                            transition={{ duration: 1 }}
                        />
                    </div>
                );
            case 'success':
                return (
                    <div className="flex items-center justify-center gap-2 text-green-400">
                        <CheckCircle size={20} />
                        <p>{file.name} uploaded successfully!</p>
                    </div>
                );
            case 'error':
                return (
                    <div className="flex items-center justify-center gap-2 text-red-400">
                        <AlertCircle size={20} />
                        <p>{error}</p>
                    </div>
                );
            default: // 'idle'
                return (
                    <div className="text-center">
                        <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-white font-semibold">Click to upload or drag & drop</p>
                        <p className="text-gray-400 text-sm">Get questions based on your projects.</p>
                        <input type="file" className="hidden" id="resumeUpload" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                    </div>
                );
        }
    };

    return (
        <section className="py-24 md:py-32">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Setup Your Interview</h1>
                    <p className="max-w-xl mx-auto mt-4 text-gray-400 mb-12">
                        Choose your path and upload your resume for tailored questions.
                    </p>
                </div>

                {/* --- Step 1: Choose Role --- */}
                <AnimatedCard className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">1. Choose a Role</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 text-center cursor-pointer hover:border-cyan-400 transition-colors">
                            <Code size={32} className="mx-auto text-cyan-400 mb-2" />
                            <p>Frontend</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 text-center cursor-pointer hover:border-cyan-400 transition-colors">
                            <Server size={32} className="mx-auto text-cyan-400 mb-2" />
                            <p>Backend</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 text-center cursor-pointer hover:border-cyan-400 transition-colors">
                            <Brain size={32} className="mx-auto text-cyan-400 mb-2" />
                            <p>Data Structures</p>
                        </div>
                    </div>
                </AnimatedCard>

                {/* --- Step 2: Upload Resume --- */}
                <AnimatedCard className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">2. Upload Resume</h2>

                    {isLoadingResume ? (
                        <p className="text-gray-400 text-center">Loading resume...</p>
                    ) : existingResume ? (
                        <div className="text-center">
                            <FileText size={40} className="mx-auto text-green-400 mb-4" />
                            <p className="text-lg font-semibold text-white">Ready to go!</p>
                            <p className="text-gray-400 mb-4">{existingResume.name}</p>
                            <label htmlFor="resumeUpload" className="text-cyan-400 hover:underline cursor-pointer">
                                Upload a different file?
                            </label>
                            <input type="file" className="hidden" id="resumeUpload" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                        </div>
                    ) : (
                        <>
                            <label
                                htmlFor="resumeUpload"
                                className="p-8 border-2 border-gray-600 border-dashed rounded-lg text-center cursor-pointer hover:border-cyan-400 transition-colors block"
                            >
                                {renderUploadState()}
                            </label>

                            {file && uploadStatus !== 'uploading' && (
                                <motion.button
                                    onClick={handleUpload}
                                    className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                                >
                                    {uploadStatus === 'success' ? 'Upload New Resume' : 'Confirm Upload'}
                                </motion.button>
                            )}
                        </>
                    )}
                </AnimatedCard>

                {/* --- Step 3: Start Button --- */}
                <motion.button
                    onClick={() => navigateTo('live')}
                    disabled={!existingResume && uploadStatus !== 'success'}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Start Interview
                </motion.button>
            </div>
        </section>
    );
};

export default InterviewSetup;
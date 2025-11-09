import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Users, UserCheck, CheckCircle, ChevronDown, Briefcase, Zap, BarChart } from 'lucide-react';
import AnimatedCard from '../components/ui/AnimatedCard.jsx';

const DemoRequestPage = ({ navigateTo }) => {
    const { register, handleSubmit, trigger, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm();
    const [step, setStep] = useState(1);

    const onSubmit = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Demo Request Submitted:', data);
    };

    const handleNext = async () => {
        const isValid = await trigger(["fullName", "workEmail"]);
        if (isValid) {
            setStep(2);
        }
    };

    // We define the Tailwind classes here for reuse.
    const inputClasses = "w-full bg-gray-900 border border-gray-600 text-white rounded-lg py-3 pl-10 pr-4 transition-colors duration-200 appearance-none focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-2";
    const errorClasses = "text-red-400 text-sm mt-2 text-left";


    return (
        <section className="py-24 md:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Request a Live Demo</h1>
                    <p className="max-w-2xl mx-auto mt-4 text-gray-400 mb-12">
                        See EchoHire AI in action. Let us show you how you can reclaim hundreds of engineering hours and hire with confidence.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <AnimatedCard className="lg:col-span-1" whileHover={{scale: 1}}>
                        <h2 className="text-2xl font-bold text-white mb-6">Why EchoHire?</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Zap size={20} className="text-cyan-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Hire 40% Faster</h3>
                                    <p className="text-gray-400 text-sm">Automate initial screening and engage only with top-tier candidates.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <UserCheck size={20} className="text-cyan-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Eliminate Bias</h3>
                                    <p className="text-gray-400 text-sm">Ensure every candidate gets a fair, consistent, and high-quality interview.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <BarChart size={20} className="text-cyan-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Deeper Insights</h3>
                                    <p className="text-gray-400 text-sm">Get detailed reports that go far beyond a resume, covering code quality, problem-solving, and communication.</p>
                                </div>
                            </li>
                        </ul>
                    </AnimatedCard>
                    <AnimatedCard className="lg:col-span-1">
                        {isSubmitSuccessful ? (
                            <div className="text-center py-12">
                                <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
                                <p className="text-gray-400">Our team has received your request and will be in touch within 24 hours to schedule your demo.</p>
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-white">{step === 1 ? 'Your Details' : 'About Your Company'}</h2>
                                    <span className="text-sm font-medium text-gray-400">Step {step} of 2</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-8">
                                    <motion.div
                                        className="bg-cyan-500 h-1.5 rounded-full"
                                        initial={{ width: '0%' }}
                                        animate={{ width: step === 1 ? '50%' : '100%' }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    />
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <AnimatePresence mode="wait">
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-6"
                                            >
                                                <div>
                                                    <label htmlFor="fullName" className={labelClasses}>Full Name</label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                        <input id="fullName" {...register('fullName', { required: 'Full name is required' })} className={inputClasses} />
                                                    </div>
                                                    {errors.fullName && <p className={errorClasses}>{errors.fullName.message}</p>}
                                                </div>
                                                <div>
                                                    <label htmlFor="workEmail" className={labelClasses}>Work Email</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                        <input id="workEmail" type="email" {...register('workEmail', { required: 'A valid email is required' })} className={inputClasses} />
                                                    </div>
                                                    {errors.workEmail && <p className={errorClasses}>{errors.workEmail.message}</p>}
                                                </div>
                                            </motion.div>
                                        )}
                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-6"
                                            >
                                                <div>
                                                    <label htmlFor="companyName" className={labelClasses}>Company Name</label>
                                                    <div className="relative">
                                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                        <input id="companyName" {...register('companyName', { required: 'Company name is required' })} className={inputClasses} />
                                                    </div>
                                                    {errors.companyName && <p className={errorClasses}>{errors.companyName.message}</p>}
                                                </div>
                                                <div>
                                                    <label htmlFor="companySize" className={labelClasses}>Company Size</label>
                                                    <div className="relative">
                                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                        <select id="companySize" {...register('companySize')} className={inputClasses}>
                                                            <option>1-50 employees</option>
                                                            <option>51-200 employees</option>
                                                            <option>201-1000 employees</option>
                                                            <option>1000+ employees</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="flex gap-4 pt-4">
                                        {step === 2 && (
                                            <motion.button type="button" onClick={() => setStep(1)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                                           className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                                            >
                                                Back
                                            </motion.button>
                                        )}
                                        {step === 1 ? (
                                            <motion.button type="button" onClick={handleNext} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                                           className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                                            >
                                                Next
                                            </motion.button>
                                        ) : (
                                            <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                                           className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Request Demo'}
                                            </motion.button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        )}
                    </AnimatedCard>
                </div>
            </div>
        </section>
    );
};

export default DemoRequestPage;
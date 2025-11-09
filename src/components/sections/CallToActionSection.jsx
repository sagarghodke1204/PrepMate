import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const CallToActionSection = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm();
    const onSubmit = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted:', data);
    };

    // Define the Tailwind classes
    const inputClasses = "w-full bg-gray-900 border border-gray-600 text-white rounded-lg py-3 pl-10 pr-4 transition-colors duration-200 appearance-none focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20";
    const errorClasses = "text-red-400 text-sm mt-2 text-left";

    return (
        <section className="py-24 bg-gradient-to-t from-black/30 to-transparent">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Revolutionize Your Hiring?</h2>
                <p className="max-w-xl mx-auto mt-4 text-gray-400 mb-10">Join the waitlist to get early access and lock in special launch pricing.</p>
                {isSubmitSuccessful ? (
                    <div className="text-green-400 text-xl font-semibold p-4 bg-green-500/10 rounded-lg max-w-lg mx-auto">You're on the list! We'll be in touch soon.</div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
                            <label htmlFor="email-input" className="sr-only">Email Address</label>
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input id="email-input" {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })} type="email" placeholder="Enter your email" aria-invalid={errors.email ? "true" : "false"} className={inputClasses}/>
                            {errors.email && <p role="alert" className={errorClasses}>{errors.email.message}</p>}
                        </div>
                        <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                       className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                        </motion.button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default CallToActionSection;
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { pricingPlans } from '../../data/mockData.jsx';
import AnimatedCard from '../ui/AnimatedCard.jsx';

const PricingSection = ({ navigateTo }) => (
    <section id="pricing" className="py-24">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white">Simple, Transparent Pricing</h2>
                <p className="max-w-xl mx-auto mt-4 text-gray-400">Choose a plan that scales with your hiring needs. No hidden fees.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {pricingPlans.map((plan, index) => (
                    <AnimatedCard key={index} className={`relative overflow-hidden flex flex-col h-full ${plan.popular ? 'border-cyan-500 transform md:scale-105' : ''}`}>
                        {plan.popular && (<div className="absolute top-0 right-0 bg-cyan-500 text-white text-xs font-bold px-8 py-1 transform translate-x-1/3 rotate-45 translate-y-3/4 origin-center">POPULAR</div>)}
                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-gray-400 mb-6 h-16">{plan.description}</p>
                        <div className="mb-8">
                            <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                            {plan.price !== 'Custom' && <span className="text-gray-500">/ month</span>}
                        </div>
                        <ul className="space-y-4 mb-8 flex-grow">
                            {plan.features.map((feature, fIndex) => (<li key={fIndex} className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0" size={20} /><span>{feature}</span></li>))}
                        </ul>
                        <motion.button onClick={() => navigateTo('demo')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                       className={`w-full mt-auto py-3 rounded-lg font-semibold transition-colors ${plan.popular ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                        >
                            {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                        </motion.button>
                    </AnimatedCard>
                ))}
            </div>
        </div>
    </section>
);

export default PricingSection;
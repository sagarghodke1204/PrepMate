import React from 'react';
import { faqData } from '../../data/mockData.jsx';
import FaqItem from '../ui/FaqItem.jsx';

const FaqSection = () => (
    <section id="faq" className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2></div>
            <div className="max-w-3xl mx-auto">{faqData.map((item, index) => (<FaqItem key={index} q={item.question} a={item.answer} />))}</div>
        </div>
    </section>
);

export default FaqSection;
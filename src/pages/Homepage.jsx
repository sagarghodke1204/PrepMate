import React from 'react';
// INCORRECT
import HeroSection from "../components/sections/HeroSection.jsx";
import FeaturesSection from "../components/sections/FeaturesSection";
import TestimonialsSection from "../components/sections/TestimonialsSection.jsx";
import PricingSection from "../components/sections/PricingSection.jsx";
import FaqSection from "../components/sections/FaqSection.jsx";
import CallToActionSection from "../components/sections/CallToActionSection.jsx";

const Homepage = ({ navigateTo }) => (
    <>
        <HeroSection navigateTo={navigateTo} />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection navigateTo={navigateTo} />
        <FaqSection />
        <CallToActionSection />
    </>
);

export default Homepage;
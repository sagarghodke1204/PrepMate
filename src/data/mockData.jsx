export const testimonialsData = [
    {
        quote: "The AI feedback was brutally honest but incredibly helpful. I fixed 3 major flaws in my coding explanation and felt way more confident in my real interview.",
        name: "Priya Sharma", // North
        title: "Computer Science, '25",
        avatar: "https://placehold.co/150x150/f472b6/ffffff?text=PS"
    },
    {
        quote: "I practiced data structures questions for a week straight. The AI kept asking follow-ups I hadn't thought of. Landed my internship at a FAANG company!",
        name: "Arjun Reddy", // South
        title: "Placed at Microsoft",
        avatar: "https://placehold.co/150x150/60a5fa/ffffff?text=AR"
    },
    {
        quote: "My favorite part was the resume-specific questions. It forced me to learn how to *actually* talk about my projects, not just list them. Game-changer.",
        name: "Rohan Gupta", // North
        title: "Software Eng. Student",
        avatar: "https://placehold.co/150x150/a78bfa/ffffff?text=RG"
    },
    {
        quote: "I was most nervous about behavioral questions. The AI's STAR method feedback was amazing. I learned how to structure my answers in a single practice session.",
        name: "Aisha Khan", // Pan-India
        title: "Information Tech, '26",
        avatar: "https://placehold.co/150x150/fca5a5/ffffff?text=AK"
    },
    {
        quote: "Used this to prep for a frontend role. The AI gave me two React-specific coding challenges and then grilled me on hooks and state management. It was perfect.",
        name: "Sameer Joshi", // West
        title: "Frontend Developer Intern",
        avatar: "https://placehold.co/150x150/818cf8/ffffff?text=SJ"
    },
    {
        quote: "Being able to practice at 2 AM without bothering anyone was the best part. No scheduling, no stress, just practice whenever I felt ready.",
        name: "Bipasha Das", // East
        title: "Data Science Student",
        avatar: "https://placehold.co/150x150/2dd4bf/ffffff?text=BD"
    }
];

export const pricingPlans = [
    {
        name: 'Starter',
        price: '$249',
        description: 'Perfect for startups and small businesses hiring for their first key roles.',
        features: ['20 Interviews / month', '1 Active Role', 'Standard Reporting', 'Email Support'],
        popular: false
    },
    {
        name: 'Growth',
        price: '$799',
        description: 'For scaling companies looking to build out their engineering teams.',
        features: ['100 Interviews / month', '5 Active Roles', 'Advanced Reporting & Analytics', 'ATS Integration'],
        popular: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For large organizations with high-volume hiring and custom needs.',
        features: ['Unlimited Interviews', 'Custom Questions & Roles', 'Dedicated Support', 'Security Reviews'],
        popular: false
    }
];

export const faqData = [
    {
        question: "How does the AI evaluate coding skills?",
        answer: "Our AI uses a multi-faceted approach. It runs code against unit tests for correctness, performs static analysis for style and best practices, and uses a proprietary model trained on millions of code reviews to assess overall quality, structure, and problem-solving approach."
    },
    {
        question: "Can we use our own interview questions?",
        answer: "Yes! The Enterprise plan allows you to create custom question banks and build entire interview templates tailored to your company's specific technical and cultural needs."
    },
    {
        question: "What technologies do you support?",
        answer: "We support over 30 languages and frameworks, including Python, JavaScript/TypeScript, Java, Go, React, and SQL. Our library is constantly expanding based on customer needs."
    },
    {
        question: "How does EchoHire AI ensure fairness and reduce bias?",
        answer: "The AI is designed to be completely objective. It is trained on a carefully curated dataset to ignore demographic information and focuses solely on the technical and problem-solving merits demonstrated by the candidate during the interview."
    }
];

export const reportData = {
    candidateName: "Jane Doe",
    role: "Senior Frontend Engineer",
    overallScore: 88,
    summary: "Jane is a strong candidate with excellent problem-solving skills and clean coding practices. She demonstrated deep knowledge of React hooks and state management. Her communication was clear and concise, though she could be more proactive in clarifying edge cases.",
    scores: [
        { skill: "Problem Solving", score: 92 },
        { skill: "JavaScript/ES6+", score: 90 },
        { skill: "React Proficiency", score: 95 },
        { skill: "CSS & Styling", score: 80 },
        { skill: "Communication", score: 85 },
        { skill: "Testing", score: 78 },
    ],
    codingChallenge: {
        problem: "Build a debounced search input component in React.",
        solutionAnalysis: "The solution was functional and efficient, correctly implementing debounce logic using a custom hook. Code was well-structured and easy to read. The component handled edge cases like rapid typing gracefully. Testing could have been more comprehensive, covering the debounce timing explicitly.",
    }
};
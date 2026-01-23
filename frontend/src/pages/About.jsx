import React from 'react';
import Card from '../components/common/Card';

const About = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                    About <span className="text-primary-600 dark:text-primary-500">TruthLens</span>
                </h1>
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                    Defending the integrity of information with Artificial Intelligence.
                </p>
            </div>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                    <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            In an age where misinformation spreads faster than facts, TruthLens aims to empower readers
                            with instant, AI-driven credibility assessments. Our goal is not just to detect fake news,
                            but to foster critical thinking and media literacy by providing transparent, data-backed
                            analyses of online content.
                        </p>
                    </Card>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Technology</h2>
                        <Card className="h-full bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
                            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2">✓</span>
                                    <span><strong>Model:</strong> Fine-tuned RoBERTa (Robustly Optimized BERT) transformer.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2">✓</span>
                                    <span><strong>Dataset:</strong> Trained on the LIAR benchmark dataset containing 12.8k+ labeled statements.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2">✓</span>
                                    <span><strong>stack:</strong> Built with PyTorch, FastAPI, and React for high-performance inference.</span>
                                </li>
                            </ul>
                        </Card>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Team</h2>
                        <Card className="h-full bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                This project was developed as a research initiative to explore the capabilities of
                                Large Language Models in automated fact-checking.
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                "The truth is rarely pure and never simple." — Oscar Wilde
                            </p>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;

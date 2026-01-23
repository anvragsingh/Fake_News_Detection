import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <div className="w-full bg-gradient-to-b from-primary-50 to-white dark:from-slate-900 dark:to-slate-800 py-20 px-4 sm:px-6 lg:px-8 text-center transition-colors duration-200">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl max-w-4xl mx-auto">
                    <span className="block">Verified News in an</span>
                    <span className="block text-primary-600 dark:text-primary-400">Era of Misinformation</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Use our advanced AI to analyze news articles and detect fake news with high accuracy.
                    Protect yourself from misleading information.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                    <div className="rounded-md shadow">
                        <Link to="/analyze">
                            <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium md:py-4 md:text-lg md:px-10">
                                Start Analyzing
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="py-12 bg-white dark:bg-slate-900 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-200">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <Card className="text-center p-8 hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700">
                        <div className="text-4xl mb-4">🚀</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Instant Analysis</h3>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                            Get results in seconds using our optimized AI engine.
                        </p>
                    </Card>
                    <Card className="text-center p-8 hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700">
                        <div className="text-4xl mb-4">🧠</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Deep Learning</h3>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                            Powered by RoBERTa transformers trained on 10k+ verified articles.
                        </p>
                    </Card>
                    <Card className="text-center p-8 hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700">
                        <div className="text-4xl mb-4">🛡️</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Transparency</h3>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                            See confidence scores and detailed probability breakdowns.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Home;

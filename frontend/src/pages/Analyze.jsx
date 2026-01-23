import React, { useState } from 'react';
import TextInput from '../components/analysis/TextInput';
import URLInput from '../components/analysis/URLInput';
import FileUpload from '../components/analysis/FileUpload';
import ResultDisplay from '../components/analysis/ResultDisplay';
import Card from '../components/common/Card';
import { analyzeText } from '../services/api';
import { clsx } from 'clsx';

const Analyze = () => {
    const [activeTab, setActiveTab] = useState('text'); // text, url, file
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleAnalyze = async (data) => {
        setIsLoading(true);
        setError('');
        setResult(null);

        try {
            // For now, we only support text analysis directly via API
            // URL and File extraction logic could be here or backend
            // Our backend currently accepts { text: "..." }

            let textToAnalyze = data.text;

            if (data.type === 'url') {
                // Placeholder for scraper integration
                // For MVP: We mock it or ask user to copy paste if scraper isn't ready
                // But let's assume we send URL to backend if supported, or error out
                // Current backend only takes text. 
                // TODO: Implement backend scraper
                setError("URL analysis is coming soon! Please copy the text manually for now.");
                setIsLoading(false);
                return;
            }

            const response = await analyzeText(textToAnalyze);
            setResult(response);
        } catch (err) {
            setError(err.response?.data?.detail || 'Analysis failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { id: 'text', label: 'Paste Text' },
        { id: 'url', label: 'Article URL' },
        { id: 'file', label: 'Upload File' },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                    Analyze News Credibility
                </h1>
                <p className="mt-3 text-xl text-gray-500 dark:text-gray-400">
                    Use our AI models to detect fake news and misinformation instantly.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
                <div className="bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 inline-flex transition-colors">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setResult(null);
                                setError('');
                            }}
                            className={clsx(
                                "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
                                activeTab === tab.id
                                    ? "bg-primary-500 text-white shadow-md"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="lg:col-span-2">
                    {activeTab === 'text' && (
                        <TextInput onAnalyze={handleAnalyze} isLoading={isLoading} />
                    )}
                    {activeTab === 'url' && (
                        <URLInput onAnalyze={handleAnalyze} isLoading={isLoading} />
                    )}
                    {activeTab === 'file' && (
                        <FileUpload onAnalyze={handleAnalyze} isLoading={isLoading} />
                    )}

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
                            <p>{error}</p>
                        </div>
                    )}
                </div>

                {/* Results Section (Sticky on desktop) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        {result ? (
                            <ResultDisplay result={result} />
                        ) : (
                            <Card className="bg-gray-50 border-dashed text-center py-12">
                                <span className="text-4xl mb-4 block">🔍</span>
                                <h3 className="text-lg font-medium text-gray-900">Ready to Analyze</h3>
                                <p className="text-gray-500 text-sm mt-2">
                                    Results will appear here after analysis.
                                </p>
                            </Card>
                        )}

                        {/* History or tips could go here */}
                        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <h4 className="font-semibold text-blue-800 text-sm mb-2">How it works</h4>
                            <p className="text-xs text-blue-600 leading-relaxed">
                                Our RoBERTa-based model analyzes linguistic patterns, sentiment, and writing style to determine the credibility of the content.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analyze;

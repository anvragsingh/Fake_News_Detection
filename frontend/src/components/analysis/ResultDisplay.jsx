import React from 'react';
import Card from '../common/Card';
import { clsx } from 'clsx';

const ResultDisplay = ({ result }) => {
    if (!result) return null;

    const isFake = result.label === 'FAKE';
    const confidence = result.confidence * 100;

    // Determine colors based on result
    const colorClass = isFake ? 'text-fake' : 'text-trust';
    const bgClass = isFake ? 'bg-fake-light' : 'bg-trust-light';
    const barColor = isFake ? 'bg-fake' : 'bg-trust';

    return (
        <Card className="animate-fade-in border-l-4" style={{ borderLeftColor: isFake ? '#ef4444' : '#22c55e' }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Analysis Result</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Based on RoBERTa deep learning model</p>
                </div>
                <div className={clsx("px-4 py-2 rounded-full font-bold text-lg mt-2 md:mt-0 uppercase tracking-wide", colorClass, bgClass)}>
                    {result.label}
                </div>
            </div>

            <div className="mb-6">
                <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Confidence Score</span>
                    <span className={colorClass}>{confidence.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                    <div
                        className={clsx("h-4 rounded-full transition-all duration-1000 ease-out", barColor)}
                        style={{ width: `${confidence}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">
                    The model is {confidence.toFixed(1)}% sure this content is {result.label}.
                </p>
            </div>

            {result.probabilities && (
                <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                    <div className="text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Real Probability</div>
                        <div className="text-xl font-bold text-trust">
                            {(result.probabilities.real * 100).toFixed(1)}%
                        </div>
                    </div>
                    <div className="text-center border-l border-gray-200 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Fake Probability</div>
                        <div className="text-xl font-bold text-fake">
                            {(result.probabilities.fake * 100).toFixed(1)}%
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default ResultDisplay;

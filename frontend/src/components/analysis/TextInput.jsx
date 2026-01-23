import React, { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';

const TextInput = ({ onAnalyze, isLoading }) => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) {
            setError('Please enter some text to analyze');
            return;
        }
        if (text.length < 50) {
            setError('Text is too short. Please enter at least 50 characters for accurate analysis.');
            return;
        }
        setError('');
        onAnalyze({ text, type: 'text' });
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="analysis-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        News Text
                    </label>
                    <textarea
                        id="analysis-text"
                        rows={8}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none transition-colors bg-white dark:bg-slate-800 dark:text-white dark:placeholder-gray-500"
                        placeholder="Paste the news article or text here..."
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            if (error) setError('');
                        }}
                    />
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                    <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Min 50 chars</span>
                        <span>{text.length} chars</span>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={!text.trim()}
                        className="w-full sm:w-auto"
                    >
                        Analyze Text
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default TextInput;

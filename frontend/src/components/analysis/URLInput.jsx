import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

const URLInput = ({ onAnalyze, isLoading }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }
        // Basic URL validation
        try {
            new URL(url);
        } catch (_) {
            setError('Please enter a valid URL (e.g., https://example.com)');
            return;
        }

        setError('');
        onAnalyze({ url, type: 'url' });
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <Input
                        label="Article URL"
                        id="news-url"
                        placeholder="https://www.nytimes.com/..."
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            if (error) setError('');
                        }}
                        error={error}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                        We will extract the text from the article automatically.
                    </p>
                </div>
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={!url.trim()}
                        className="w-full sm:w-auto"
                    >
                        Analyze URL
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default URLInput;

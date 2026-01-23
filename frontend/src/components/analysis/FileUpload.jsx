import React, { useRef, useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const FileUpload = ({ onAnalyze, isLoading }) => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
                setSelectedFile(file);
                setError('');
            } else {
                setError('Only .txt files are supported currently.');
                setSelectedFile(null);
            }
        }
    };

    const handleAnalyze = () => {
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            if (text.length < 50) {
                setError('File content is too short.');
                return;
            }
            onAnalyze({ text, type: 'file', fileName: selectedFile.name });
        };
        reader.readAsText(selectedFile);
    };

    return (
        <Card>
            <div className="text-center p-6 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".txt"
                />

                <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {selectedFile ? (
                            <span className="font-semibold text-primary-600 dark:text-primary-400">{selectedFile.name}</span>
                        ) : (
                            <span className="text-gray-500 dark:text-gray-400">Upload a text file (.txt)</span>
                        )}
                    </p>
                </div>

                {error && <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>}

                <div className="space-x-4">
                    <Button
                        variant="secondary"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                    >
                        Select File
                    </Button>
                    <Button
                        onClick={handleAnalyze}
                        disabled={!selectedFile || isLoading}
                        isLoading={isLoading}
                    >
                        Analyze File
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default FileUpload;

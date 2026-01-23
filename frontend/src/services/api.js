import axios from 'axios';

// Get API URL from env, default to localhost:8001 if not set
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api/v1';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const checkHealth = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        console.error('API Health Check Failed:', error);
        throw error;
    }
};

export const analyzeText = async (text) => {
    try {
        const response = await api.post('/analyze', { text });
        return response.data;
    } catch (error) {
        console.error('Analysis request failed:', error);
        throw error;
    }
};

export default api;

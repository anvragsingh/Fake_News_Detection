/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9', // Sky blue for general UI
                    600: '#0284c7',
                    700: '#0369a1',
                },
                trust: {
                    light: '#dcfce7',
                    DEFAULT: '#22c55e', // Green for Real
                    dark: '#15803d',
                },
                fake: {
                    light: '#fee2e2',
                    DEFAULT: '#ef4444', // Red for Fake
                    dark: '#b91c1c',
                }
            },
        },
    },
    plugins: [],
}

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Analyze', path: '/analyze' },
        { name: 'About', path: '/about' },
    ];

    return (
        <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center mr-2">
                                <span className="text-white font-bold text-lg">AI</span>
                            </div>
                            <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">TruthLens</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <nav className="hidden sm:flex space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={clsx(
                                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors",
                                        location.pathname === item.path
                                            ? "border-primary-500 text-gray-900 dark:text-white"
                                            : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDark ? (
                                /* Sun Icon */
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                /* Moon Icon */
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="flex items-center sm:hidden">
                        {/* Mobile menu button placeholder */}
                        <button className="p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Open menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

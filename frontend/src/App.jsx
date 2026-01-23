import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import About from './pages/About';
import './styles/index.css';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="flex flex-col min-h-screen transition-colors duration-200 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                    <Header />
                    <main className="flex-grow bg-slate-50 dark:bg-slate-900">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/analyze" element={<Analyze />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;

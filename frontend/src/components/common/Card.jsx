import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, padding = "p-6" }) => {
    return (
        <div className={twMerge("bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors", padding, className)}>
            {children}
        </div>
    );
};

export default Card;

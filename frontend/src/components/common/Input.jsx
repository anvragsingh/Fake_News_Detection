import React from 'react';
import { twMerge } from 'tailwind-merge';

const Input = ({
    label,
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    className,
    ...props
}) => {
    return (
        <div className={className}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={twMerge(
                    "w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-500",
                    error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                )}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Input;

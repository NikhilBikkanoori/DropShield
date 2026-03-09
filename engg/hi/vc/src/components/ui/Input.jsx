import React from 'react';

export const Input = React.forwardRef(({ className = '', ...props }, ref) => {
    return (
        <input
            className={`flex h-10 w-full rounded-md border border-white/10 bg-[#1a2349] px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A2F4F9] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = 'Input';

export default Input;

import React from 'react';

const Button = ({
    children,
    variant = 'primary', // primary, secondary, ghost, danger
    size = 'md', // sm, md, lg
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100';

    const variants = {
        primary: 'bg-[#A2F4F9] text-[#262C53] hover:bg-[#83E1E7]',
        secondary: 'bg-[#262C53] text-white hover:bg-[#2e3563] border border-white/10',
        ghost: 'bg-transparent text-[#A2F4F9] hover:bg-white/5',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    const sizes = {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 py-2 px-4',
        lg: 'h-11 px-8 text-lg',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;

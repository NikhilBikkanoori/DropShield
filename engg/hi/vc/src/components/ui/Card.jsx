import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-[#262C53] rounded-xl border border-white/5 shadow-lg overflow-hidden ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;

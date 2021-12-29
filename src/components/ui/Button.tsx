import React, { ButtonHTMLAttributes } from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className = '', ...props }: Props) {
    return (
        <button
            type={props.type || 'button'}
            className={`mt-6 px-4 h-8 bg-red-500 text-white whitespace-nowrap border-b
                border-red-500/25 text-xs uppercase tracking-wider font-bold rounded-sm
                shadow-md hover:shadow-lg active:shadow-none
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}

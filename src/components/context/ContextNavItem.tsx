import React from 'react';

type Props = {
    children: React.ReactNode;
    icon: React.ReactNode;
    active?: boolean;
};

export default function ContextNavItem({ icon, children, active = false }: Props) {
    return (
        <li
            className={`
                px-2 py-1 group text-base hover:text-indigo-500
                ${active ? 'bg-indigo-500 text-white' : ''}
            `}
        >
            {icon}
            {children}
        </li>
    );
}

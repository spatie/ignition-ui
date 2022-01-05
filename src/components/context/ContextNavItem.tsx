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
                flex items-center gap-3
                py-1 group text-base hover:text-indigo-500
                ${active ? 'text-indigo-500' : ''}
            `}
        >
            <span className="opacity-50">{icon}</span>
            {children}
        </li>
    );
}

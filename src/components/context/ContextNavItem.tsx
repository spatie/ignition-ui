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
                cursor-pointer
                py-1 group text-base hover:text-indigo-500
                ${active ? '~text-indigo-600' : ''}
            `}
        >
            <span className="opacity-50">{icon}</span>
            <span>{children}</span>
        </li>
    );
}

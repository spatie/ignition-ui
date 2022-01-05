import React from 'react';

type Props = {
    children: React.ReactNode;
    icon: React.ReactNode;
};

export default function ContextNavItem({ icon, children }: Props) {
    return (
        <li className="px-2 py-1 group text-base hover:text-indigo-500">
            {icon}
            {children}
        </li>
    );
}

import React from 'react';

type Props = {
  children: React.ReactNode;
  icon: string;
};

export default function ContextNavItem({ icon, children }: Props) {
    return (
        <li className="px-2 py-1 group text-base bg-indigo-500 text-white">
            <i className={`mr-0.5 fa-fw text-xs text-white/50 ${icon}`} />
            {children}
        </li>
    )
}

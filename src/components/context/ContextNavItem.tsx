import React from 'react';

type Props = {
  children: React.ReactNode;
  icon: string;
};

export default function ContextNavItem({ icon, children }: Props) {
    return (
        <li className="px-2 py-1 group text-base hover:text-indigo-500">
            <i className={`mr-0.5 fa-fw text-xs text-gray-400 group-hover:text-indigo-500 ${icon}`} />
            {children}
        </li>
    )
}

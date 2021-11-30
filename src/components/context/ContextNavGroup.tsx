import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function ContextNavGroup({ title, children }: Props) {
    return (
        <li>
            <h4 className="uppercase tracking-wider ~text-gray-500 text-xs font-bold">
                {title}
            </h4>
            <ul className="mt-3 grid grid-cols-1 gap-2">
                {children}
            </ul>
        </li>
    )
}

import React from 'react';
import useSectionInView from '../../hooks/useSectionInView';

export type ContextSectionProps = {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
};

export default function ContextSection({ icon, title, children }: ContextSectionProps) {
    const ref = useSectionInView(title);

    return (
        <div ref={ref} className="mb-10 flex flex-col gap-2">
            <h1 className="flex items-center gap-3 py-2 font-semibold text-lg ~text-indigo-600">
                {title}
                <span className="opacity-50 ~text-gray-500 text-sm">{icon}</span>
            </h1>
            {children}
        </div>
    );
}

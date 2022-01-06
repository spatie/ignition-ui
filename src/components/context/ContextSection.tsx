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
        <div ref={ref}>
            <h1 className="mb-2 flex items-center gap-2 font-semibold text-lg ~text-indigo-600">
                {title}
                <span className="opacity-50 ~text-indigo-600 text-sm">{icon}</span>
            </h1>
            {children}
        </div>
    );
}

import React from 'react';
import useSectionInView from '../../hooks/useSectionInView';

export type ContextSectionProps = {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    anchor: string;
};

export default function ContextSection({ icon, title, children, anchor }: ContextSectionProps) {
    const ref = useSectionInView(title);

    return (
        <div ref={ref}>
            <a id={`context-${anchor}`} className="scroll-target" />
            <h1 className="mb-2 flex items-center gap-2 font-semibold text-lg ~text-indigo-600">
                {title}
                <span className="opacity-50 ~text-indigo-600 text-sm">{icon}</span>
            </h1>
            {children}
        </div>
    );
}

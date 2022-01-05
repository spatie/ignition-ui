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
        <div ref={ref} className="flex flex-col gap-y-2">
            <h1 className="py-2 col-span-2 font-semibold text-lg ~text-indigo-600">
                {title}
                {icon}
            </h1>
            {children}
        </div>
    );
}

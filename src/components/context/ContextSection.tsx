import React from 'react';

export type ContextSectionProps = {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
};

export default function ContextSection({ icon, title, children }: ContextSectionProps) {
    return (
        <div className="contents">
            <h1 className="py-2 col-span-2 font-semibold text-lg ~text-indigo-600">
                {title}
                {icon}
            </h1>
            {children}
        </div>
    );
}

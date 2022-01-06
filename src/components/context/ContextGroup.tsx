import React from 'react';

export type ContextGroupProps = {
    title: string;
    children: Array<React.ReactElement | null | false>;
};

export default function ContextGroup({ title, children }: ContextGroupProps) {
    return (
        <section className="py-10 shadow-lg ~bg-white px-6 sm:px-10 min-w-0 overflow-hidden">
            <h2 className="font-bold text-xs ~text-gray-500 uppercase tracking-wider">
                {title}
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-10">
                {children}
            </div>
        </section>
    );
}

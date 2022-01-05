import React from 'react';

export type ContextGroupProps = {
    title: string;
    children: Array<React.ReactElement | null | false>;
};

export default function ContextGroup({ title, children }: ContextGroupProps) {
    return (
        <section className="flex flex-col gap-y-2 shadow-lg ~bg-white px-6 sm:px-10 pt-8 pb-20 min-w-0 overflow-hidden">
            <h2 className="mb-6 col-span-2 font-bold leading-snug text-xl ~text-indigo-600 uppercase tracking-wider">
                {title}
            </h2>
            {children}
        </section>
    );
}

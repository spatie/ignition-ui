import React from 'react';

export type ContextGroupProps = {
    title: string;
    children: Array<React.ReactElement | null | false>;
};

export default function ContextGroup({ title, children }: ContextGroupProps) {
    return (
        <section className="py-10 flex flex-col gap-y-2 shadow-lg ~bg-white px-6 sm:px-10 min-w-0 overflow-hidden">
            <h2 className="col-span-2 font-bold leading-snug text-sm ~text-gray-500 uppercase tracking-wider">
                {title}
            </h2>
            {children}
        </section>
    );
}

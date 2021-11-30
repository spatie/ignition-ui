import React from 'react';

type Props = {
    title: string;
    children: React.ReactNode;
};

export default function ContextGroup({ title, children }: Props) {
    return (
        <section
            className="shadow-lg
              ~bg-white px-6 sm:px-10 pt-8 pb-20 min-w-0 overflow-hidden"
        >
            <dl className="grid grid-cols-[8rem,minmax(0,1fr)] gap-x-10 gap-y-2">
                <h2 className="mb-6 col-span-2 font-bold leading-snug text-xl ~text-indigo-600 uppercase tracking-wider">
                    {title}
                </h2>

                {children}
            </dl>
        </section>
    )
}

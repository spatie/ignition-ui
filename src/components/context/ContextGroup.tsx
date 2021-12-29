import React from 'react';
import DefinitionList from '../ui/DefinitionList';

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
            <DefinitionList title={title}>{children}</DefinitionList>
        </section>
    );
}

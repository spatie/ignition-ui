import React from 'react';
import DefinitionList from '../ui/DefinitionList';

type Props = {
    items: Record<string, string | object>;
};

export default function ContextList({ items }: Props) {
    return (
        <>
            {Object.entries(items || {}).map(([key, value]) => (
                <DefinitionList.Row key={key} label={key} value={value} />
            ))}
        </>
    );
}

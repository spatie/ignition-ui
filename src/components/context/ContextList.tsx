import React from 'react';
import DefinitionList from '../ui/DefinitionList';

type Props = {
    items: Record<string, string | object | boolean | number>;
};

export default function ContextList({ items }: Props) {
    return (
        <DefinitionList>
            {Object.entries(items || {}).map(([key, value]) => (
                <DefinitionList.Row key={key} label={key} value={value} />
            ))}
        </DefinitionList>
    );
}

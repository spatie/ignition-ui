import React, { useContext } from 'react';
import ContextList from '../ContextList';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';

export default function LivewireComponent() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const livewire = errorOccurrence.context_items.livewire;

    if (!livewire) {
        return null;
    }

    return (
        <ContextList
            items={{
                Component: livewire.component_class,
                Alias: livewire.component_alias,
                ID: livewire.component_id,
            }}
        />
    );
}

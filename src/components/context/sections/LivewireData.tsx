import React, { useContext } from 'react';
import ContextList from '../ContextList';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';

export default function LivewireData() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const livewire = errorOccurrence.context_items.livewire;

    if (!livewire) {
        return null;
    }

    return <ContextList items={livewire.data} />;
}

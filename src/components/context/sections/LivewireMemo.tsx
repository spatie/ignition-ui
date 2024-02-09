import React, { useContext } from 'react';
import ContextList from '../ContextList';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';

export default function LivewireMemo() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const livewire = errorOccurrence.context_items.livewire;

    if (!livewire) {
        return null;
    }

    if (!livewire.memo) {
        return null;
    }

    return <ContextList items={livewire.memo} />;
}

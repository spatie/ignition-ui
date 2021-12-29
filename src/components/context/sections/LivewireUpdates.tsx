import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import DefinitionList from '../../ui/DefinitionList';

export default function LivewireUpdates() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const livewire = errorOccurrence.context_items.livewire;

    if (!livewire) {
        return null;
    }

    return (
        <>
            {livewire.updates.map(({ payload, type }, index) => (
                <DefinitionList.Row key={index} label={type} value={payload} />
            ))}
        </>
    );
}

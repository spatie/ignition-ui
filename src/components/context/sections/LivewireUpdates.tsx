import React, { useContext } from 'react';
import ContextList from '../ContextList';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import mapValues from 'lodash/mapValues';
import mapKeys from 'lodash/mapKeys';

export default function LivewireUpdates() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const livewire = errorOccurrence.context_items.livewire;

    if (!livewire) {
        return null;
    }

    const livewireUpdates = mapValues(
        mapKeys(livewire.updates, ({ type }) => type),
        ({ payload }) => payload,
    );

    // TODO: Better UI?
    return <ContextList items={livewireUpdates} />;
}

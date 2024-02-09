import React, {useContext} from 'react';
import ContextList from "../ContextList";
import ErrorOccurrenceContext from "../../../contexts/ErrorOccurrenceContext";

export default function LivewireCalls() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const livewire = errorOccurrence.context_items.livewire;

    if (!livewire || !livewire.calls) {
        return null;
    }

    return <>
        {livewire.calls.map((call, index) => (
            <ContextList
                key={index}
                items={{
                    Method: call.method,
                    Params: call.params,
                    Path: call.path ?? undefined,
                }}
            />
        ))}
    </>;
}

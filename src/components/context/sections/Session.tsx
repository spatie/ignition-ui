import React, {useContext} from 'react';
import ContextList from "../ContextList";
import {getContextValues} from "../../../util";
import ErrorOccurrenceContext from "../../../contexts/ErrorOccurrenceContext";

export default function Session() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    return (
        <ContextList items={getContextValues(errorOccurrence, 'session')} />
    )
}

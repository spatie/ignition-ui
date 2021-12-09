import React, {useContext} from 'react';
import ContextList from "../ContextList";
import {getContextValues} from "../../../util";
import ErrorOccurrenceContext from "../../../contexts/ErrorOccurrenceContext";

export default function Headers() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    return (
        <ContextList items={getContextValues(errorOccurrence, 'headers')} />
    )
}

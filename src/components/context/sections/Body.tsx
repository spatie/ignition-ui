import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import { getContextValues, jsonStringify } from '../../../util';
import CodeSnippet from '../../ui/CodeSnippet';

export default function Body() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const body = getContextValues(errorOccurrence, 'request_data').body;

    return (
        <CodeSnippet value={jsonStringify(body)} />
    );
}

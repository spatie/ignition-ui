import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import { getContextValues } from '../../../util';
import CodeSnippet from '../../ui/CodeSnippet';
import { QueryDebug } from '../../../types';
import DebugItem from '../DebugItem';

export default function Queries() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const queries = Object.values(getContextValues(errorOccurrence, 'queries') as QueryDebug[]);

    return (
        <>
            {queries.map((query, index) => (
                <DebugItem key={index}>
                    <span className={`bg-gray-500 text-white rounded py-1 px-2 shadow-sm`}>
                        {query.connection_name}
                    </span>

                    {/* TODO: Bindings */}
                    <CodeSnippet value={query.sql} />

                    <span>Runtime: {query.time}sec</span>
                </DebugItem>
            ))}
        </>
    );
}

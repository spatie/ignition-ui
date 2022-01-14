import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import { getContextValues, unixToDate } from '../../../util';
import CodeSnippet from '../../ui/CodeSnippet';
import { QueryDebug } from '../../../types';
import DebugItem from '../DebugItem';

export default function Queries() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const queries = Object.values(getContextValues(errorOccurrence, 'queries') as QueryDebug[]);

    return (
        <>
            {queries.map((query, index) => (
                <DebugItem
                    key={index}
                    time={unixToDate(query.microtime)}
                    meta={{
                        runtime: `${query.time}ms`,
                        connection: query.connection_name,
                    }}
                >
                    {/* TODO: Bindings */}
                    <CodeSnippet value={query.sql} language="sql" />
                </DebugItem>
            ))}
        </>
    );
}

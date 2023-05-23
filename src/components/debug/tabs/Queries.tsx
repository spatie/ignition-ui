import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import { unixToDate } from '../../../util';
import CodeSnippet from '../../ui/CodeSnippet';
import DebugItem from '../DebugItem';

export default function Queries() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const queries = Object.values(errorOccurrence.context_items.queries!);

    function replaceBindings(sql: string, bindings: any[]) {
        bindings.forEach((binding) => {
            sql = sql.replace('?', binding);
        });
        return sql;
    }

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
                    <CodeSnippet value={replaceBindings(query.sql, query.bindings)} language="sql" />
                </DebugItem>
            ))}
        </>
    );
}

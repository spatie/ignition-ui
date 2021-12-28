import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import { getContextValues } from '../../../util';
import CodeSnippet from '../../ui/CodeSnippet';
import { LogDebug } from '../../../types';
import DebugItem from '../DebugItem';

export default function Logs() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const logs = Object.values(getContextValues(errorOccurrence, 'logs') as LogDebug[]);

    return (
        <>
            {logs.map((log, index) => (
                <DebugItem key={index} context={log.context} level={log.level}>
                    <CodeSnippet value={log.message} />
                </DebugItem>
            ))}
        </>
    );
}

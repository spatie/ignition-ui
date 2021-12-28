import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import CodeSnippet from '../../ui/CodeSnippet';
import DebugItem from '../DebugItem';

export default function Glows() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const glows = errorOccurrence.glows;

    return (
        <>
            {glows.map((glow, index) => (
                <DebugItem key={index} level={glow.message_level} context={glow.meta_data}>
                    <CodeSnippet value={glow.name} />
                </DebugItem>
            ))}
        </>
    );
}

import React, { useContext } from 'react';
import { getContextValues, unixToDate } from '../../../util';
import ErrorOccurrenceContext from 'contexts/ErrorOccurrenceContext';
import DebugItem from 'components/debug/DebugItem';
import { DumpDebug } from 'types';
import EditorLink from '../../ui/EditorLink';

export default function Dumps() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const dumps = Object.values(getContextValues(errorOccurrence, 'dumps')) as Array<DumpDebug>;

    console.log(dumps);

    return (
        <>
            {dumps.map((dump) => (
                <DebugItem time={unixToDate(dump.microtime)}>
                    <EditorLink path={dump.file} lineNumber={dump.line_number} className="text-sm" />
                    <div dangerouslySetInnerHTML={{ __html: dump.html_dump }} />
                </DebugItem>
            ))}
        </>
    );
}

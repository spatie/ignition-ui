import React, { useContext } from 'react';
import { getContextValues } from '../../../util';
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
                <DebugItem>
                    <div dangerouslySetInnerHTML={{ __html: dump.html_dump }} />
                    <EditorLink path={dump.file} lineNumber={dump.line_number} />
                </DebugItem>
            ))}
        </>
    );
}

import React, { useContext } from 'react';
import { getContextValues, unixToDate } from '../../../util';
import ErrorOccurrenceContext from 'contexts/ErrorOccurrenceContext';
import DebugItem from 'components/debug/DebugItem';
import { DumpDebug } from 'types';
import EditorLink from '../../ui/EditorLink';
import SfDump from '../../ui/SfDump';

export default function Dumps() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const dumps = Object.values(getContextValues(errorOccurrence, 'dumps')) as Array<DumpDebug>;

    return (
        <>
            {dumps.map((dump) => (
                <DebugItem key={dump.microtime} time={unixToDate(dump.microtime)}>
                    <div className="mb-2">
                        <EditorLink path={dump.file} lineNumber={dump.line_number} className="text-sm" />
                    </div>
                    <SfDump value={dump.html_dump} />
                </DebugItem>
            ))}
        </>
    );
}

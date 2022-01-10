import React, { useContext } from 'react';
import { getContextValues } from '../../util';
import ErrorOccurrenceContext from 'contexts/ErrorOccurrenceContext';
import DebugTabs from './DebugTabs';
import Logs from 'components/debug/tabs/Logs';
import Dumps from 'components/debug/tabs/Dumps';
import Queries from './tabs/Queries';
import Glows from './tabs/Glows';

export default function Debug() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const dumps = getContextValues(errorOccurrence, 'dumps');
    const glows = errorOccurrence.glows;
    const queries = getContextValues(errorOccurrence, 'queries');
    const logs = getContextValues(errorOccurrence, 'logs');

    return (
        <section>
            <a id="debug" className="z-50 absolute top-[-7.5rem]" />
            <DebugTabs>
                <DebugTabs.Tab component={Dumps} name="Dumps" count={Object.keys(dumps).length} />
                <DebugTabs.Tab component={Glows} name="Glows" count={glows.length} />
                <DebugTabs.Tab component={Queries} name="Queries" count={Object.keys(queries).length} />
                <DebugTabs.Tab component={Logs} name="Logs" count={Object.keys(logs).length} />
            </DebugTabs>
        </section>
    );
}

import React, {useContext} from 'react';
import {getContextValues} from "../../util";
import ErrorOccurrenceContext from "../../contexts/ErrorOccurrenceContext";
import DebugTabs from "./DebugTabs";
import Logs from "./tabs/Logs";

export default function Debug() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const dumps = getContextValues(errorOccurrence, 'dumps');
    const glows = errorOccurrence.glows;
    const queries = getContextValues(errorOccurrence, 'queries');
    const logs = getContextValues(errorOccurrence, 'logs');

    return (
        <section className="mt-20 2xl:col-start-2">
            <a id="debug" className="z-50 absolute top-[-7.5rem]"/>
            <DebugTabs>
                <DebugTabs.Tab component={Logs} name="Dumps" count={Object.keys(dumps).length} />
                <DebugTabs.Tab component={Logs} name="Glows" count={glows.length} />
                <DebugTabs.Tab component={Logs} name="Queries" count={Object.keys(queries).length} />
                <DebugTabs.Tab component={Logs} name="Logs" count={Object.keys(logs).length} />
            </DebugTabs>
        </section>
    );
}

// function createQueryEvent({microtime, sql, time, connection_name, bindings, replace_bindings}: any): DebugEventType {
//     return {
//         microtime,
//         type: 'query',
//         label: sql,
//         metadata: {time, connection_name},
//         context: bindings || {},
//         replace_bindings: replace_bindings,
//     };
// }
//
// function createDumpEvent({microtime, html_dump, file, line_number}: any): DebugEventType {
//     return {
//         microtime,
//         type: 'dump',
//         label: html_dump,
//         metadata: {file, line_number},
//         context: {},
//     };
// }
//
// function createLogEvent({microtime, context, level, message}: any): DebugEventType {
//     return {
//         microtime,
//         type: 'log',
//         label: message,
//         metadata: {level},
//         context,
//     };
// }
//
// function createGlowEvent({microtime, message_level, meta_data, time, name}: any): DebugEventType {
//     return {
//         type: 'glow',
//         label: name,
//         microtime,
//         metadata: {time, message_level},
//         context: meta_data || {},
//     };
// }

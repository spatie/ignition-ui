import React, {useContext, useState} from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import {unixToDate} from '../../../util';
import CodeSnippet from '../../ui/CodeSnippet';
import DebugItem from '../DebugItem';
import {QueryDebug} from "types";
import DefinitionList from "components/ui/DefinitionList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import RoundedButton from "components/ui/RoundedButton";

function Bindings({bindings, hidden = false}: { bindings: String[], hidden: boolean }) {
    const [isHidden, setHidden] = useState(hidden);

    return (
        <div>
            <h1 className="mb-2 flex items-center gap-2 font-medium text-lg">
                Bindings
                <RoundedButton
                    onClick={() => setHidden(!isHidden)}
                >
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        className={`transition-transform duration-300 transform ${isHidden ? '' : 'rotate-180'}`}
                    />
                </RoundedButton>
            </h1>
            {!isHidden && (
                <DefinitionList>
                    {bindings.map((binding, index) => (
                        <DefinitionList.Row key={index} value={binding} label={index + 1}/>
                    ))}
                </DefinitionList>
            )}
        </div>
    )
}

export default function Queries() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    let queries = Object.values(errorOccurrence.context_items.queries!);

    function canReplaceBindings(query: QueryDebug) {
        return query.bindings !== null && query.sql.split('?').length - 1 === query.bindings.length;
    }

    function replaceBindings(query: QueryDebug) {
        let sql = query.sql;

        query.bindings?.forEach((binding) => {
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
                    {query.bindings && query.bindings.length > 0 ? (
                        <div className="grid gap-4 grid-cols-1">
                            <CodeSnippet value={canReplaceBindings(query) ? replaceBindings(query) : query.sql} language="sql"/>
                            <Bindings bindings={query.bindings} hidden={canReplaceBindings(query)}/>
                        </div>
                    ) : (
                        <CodeSnippet value={query.sql} language="sql"/>
                    )}
                </DebugItem>
            ))}
        </>
    );
}

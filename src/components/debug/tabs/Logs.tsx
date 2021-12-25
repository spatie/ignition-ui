import React, {useContext} from 'react';
import ErrorOccurrenceContext from "../../../contexts/ErrorOccurrenceContext";
import {getContextValues} from "../../../util";
import CodeSnippet from "../../ui/CodeSnippet";
import ContextList from "../../context/ContextList";

type LogItem = {
    context: Record<string, string | object>;
    level: string;
    message: string;
    microtime: number;
}

export default function Logs() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const logs = Object.values(getContextValues(errorOccurrence, 'logs') as LogItem[]);

    return (
        <>
            {logs.map((log, index) => (
                <div key={index} className="border-b">
                    <CodeSnippet value={log.message}/>

                    <div className="grid grid-cols-[8rem,minmax(0,1fr)] gap-x-10 gap-y-2">
                        <ContextList items={log.context}/>
                    </div>
                </div>
            ))}
        </>
    )
}

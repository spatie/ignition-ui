import React, { useContext, useMemo } from 'react';
import CodeSnippet from "../../ui/CodeSnippet";
import ErrorOccurrenceContext from "../../../contexts/ErrorOccurrenceContext";
import {curlCommand, getContextValues} from "../../../util";

export default function Request() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const request = getContextValues(errorOccurrence, 'request');
    const requestData = getContextValues(errorOccurrence, 'request_data');
    const headers = getContextValues(errorOccurrence, 'headers');

    const curl = useMemo(() => curlCommand(request, requestData, headers), [request, requestData, headers]);

    return (
        <div>
            <div className="text-lg font-semibold flex items-center">
                <span className="~text-indigo-600">{request.url}</span>
                <span
                    className="ml-2 px-1.5 rounded-sm  border border-indigo-500/20 ~text-indigo-600 text-xs uppercase tracking-wider"
                >
                    {request.method.toUpperCase()}
                </span>
            </div>

            {curl && (
                <div className="mt-2">
                    <CodeSnippet value={curl} />
                </div>
            )}
        </div>
    )
}

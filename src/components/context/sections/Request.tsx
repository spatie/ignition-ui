import React, { useContext, useMemo } from 'react';
import CodeSnippet from "../../ui/CodeSnippet";
import ErrorOccurrenceContext from "../../../contexts/ErrorOccurrenceContext";
import {curlCommand, getContextValues} from "../../../util";
import Tag from 'components/ui/Tag';

export default function Request() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const request = getContextValues(errorOccurrence, 'request');
    const requestData = getContextValues(errorOccurrence, 'request_data');
    const headers = getContextValues(errorOccurrence, 'headers');

    const curl = useMemo(() => curlCommand(request, requestData, headers), [request, requestData, headers]);

    return (
        <div>
            <div className="text-lg font-semibold flex items-center gap-2">
                <span className="~text-indigo-600">{request.url}</span>
                <Tag color={request.method.toUpperCase() == 'DELETE' ? 'red' : 'blue'}>
                    {request.method.toUpperCase()}
                </Tag>
            </div>

            {curl && (
                <div className="mt-2">
                    <CodeSnippet value={curl} />
                </div>
            )}
        </div>
    )
}

import React, {useContext} from 'react';
import ErrorOccurrenceContext from "../../../contexts/ErrorOccurrenceContext";
import {getContextValues} from "../../../util";
import CodeSnippet from "../../ui/CodeSnippet";

export default function Body() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const body = getContextValues(errorOccurrence, 'request_data').body;

    return (
        <div className="col-span-2">
            <CodeSnippet value={JSON.stringify(body)}/>
        </div>
    )
}

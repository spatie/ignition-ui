import React, {useContext} from 'react';
import ErrorOccurrenceContext from "../../../contexts/ErrorOccurrenceContext";
import {getContextValues} from "../../../util";
import CodeSnippet from "../../ui/CodeSnippet";

export default function Files() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const files = getContextValues(errorOccurrence, 'request_data').files;

    return (
        <div className="col-span-2">
            <CodeSnippet value={JSON.stringify(files)}/>
        </div>
    )
}

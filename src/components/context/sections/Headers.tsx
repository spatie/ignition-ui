import React, {useContext} from 'react';
import ErrorOccurrenceContext from "../../../contexts/ErrorOccurrenceContext";
import CodeSnippet from "../../ui/CodeSnippet";

export default function Headers() {
    const {context_items} = useContext(ErrorOccurrenceContext);

    console.log(context_items);

    return (
        <>
            {context_items.headers.map((header, index) => (
                <React.Fragment key={index}>
                    <dt className="py-2 truncate">{header.name}</dt>
                    <dd>
                        <CodeSnippet value={header.value} />
                    </dd>
                </React.Fragment>
            ))}
        </>
    )
}

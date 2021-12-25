import React from 'react';
import CodeSnippet from "../ui/CodeSnippet";

type Props = {
    items: Record<string, string|object>;
}

export default function ContextList({items}: Props) {
    return (
        <>
            {Object.entries(items || {}).map(([key, value], index) => (
                <React.Fragment key={index}>
                    <dt className="py-2 truncate">{key}</dt>
                    <dd>
                        {typeof value === 'string' ? (
                            <CodeSnippet value={value}/>
                        ) : (
                            <CodeSnippet value={JSON.stringify(value)}/>
                        )}
                    </dd>
                </React.Fragment>
            ))}
        </>
    )
}

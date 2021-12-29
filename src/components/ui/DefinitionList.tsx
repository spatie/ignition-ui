import React from 'react';
import CodeSnippet from './CodeSnippet';

type Props = {
    title?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | Array<React.ReactNode>;
};

export default function DefinitionList({ children, title = '', className = '', ...props }: Props) {
    return (
        <>
            {title && (
                <h2 className="mb-6 col-span-2 font-bold leading-snug text-xl ~text-indigo-600 uppercase tracking-wider">
                    {title}
                </h2>
            )}

            {children && (
                <dl className={`grid grid-cols-[8rem,minmax(0,1fr)] gap-x-10 gap-y-2 ${className}`} {...props}>
                    {children}
                </dl>
            )}
        </>
    );
}

DefinitionList.Row = DefinitionListRow;

type DefinitionListRowProps = {
    value?: string | React.ReactNode | Array<any> | Object;
    label?: string | React.ReactNode;
    className?: string;
};

function DefinitionListRow({ value = '', label = '', className = '' }: DefinitionListRowProps) {
    let valueOutput: React.ReactNode = value;

    if (React.isValidElement(value)) {
        valueOutput = value;
    } else if (typeof value === 'object') {
        valueOutput = <CodeSnippet value={JSON.stringify(value, null, 4)} />;
    } else if (typeof value === 'string') {
        valueOutput = <CodeSnippet value={value} />;
    }

    return (
        <div className={`contents ${className}`}>
            <dt className="py-2 truncate">{label}</dt>
            <dd>{valueOutput}</dd>
        </div>
    );
}

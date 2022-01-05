import React from 'react';
import CodeSnippet from './CodeSnippet';
import { jsonStringify } from '../../util';

type Props = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | Array<React.ReactNode>;
};

export default function DefinitionList({ children, className = '', ...props }: Props) {
    if (!children) {
        return null;
    }

    return (
        <dl className={`grid grid-cols-[8rem,minmax(0,1fr)] gap-x-10 gap-y-2 ${className}`} {...props}>
            {children}
        </dl>
    );
}

DefinitionList.Row = DefinitionListRow;

type DefinitionListRowProps = {
    value?: string | React.ReactNode | Array<any> | Object | boolean;
    label?: string | React.ReactNode;
    className?: string;
};

function DefinitionListRow({ value = '', label = '', className = '' }: DefinitionListRowProps) {
    let valueOutput: React.ReactNode = value;

    if (React.isValidElement(value)) {
        valueOutput = value;
    } else if (typeof value === 'boolean') {
        valueOutput = value ? <i className="fas fa-check" /> : <i className="fas fa-times" />;
    } else if (typeof value === 'object') {
        valueOutput = <CodeSnippet value={jsonStringify(value)} />;
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

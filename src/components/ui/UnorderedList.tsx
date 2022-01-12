import React from 'react';
import CodeSnippet from './CodeSnippet';
import { jsonStringify } from '../../util';

type Props = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | Array<React.ReactNode>;
};

export default function UnorderedList({ children, className = '', ...props }: Props) {
    return (
        <>
            {children && (
                <ul className={`gap-y-2 flex flex-col ${className}`} {...props}>
                    {children}
                </ul>
            )}
        </>
    );
}

UnorderedList.Item = UnorderedListItem;

type UnorderedListItemProps = {
    value?: string | React.ReactNode | Array<any> | Object;
};

function UnorderedListItem({ value = '' }: UnorderedListItemProps) {
    let valueOutput: React.ReactNode = value;

    if (React.isValidElement(value)) {
        valueOutput = value;
    } else if (typeof value === 'object') {
        valueOutput = <CodeSnippet value={jsonStringify(value)} />;
    } else if (typeof value === 'string') {
        valueOutput = <CodeSnippet value={value} />;
    }

    return <li>{valueOutput}</li>;
}

import React from 'react';
import CodeSnippet from './CodeSnippet';
import { jsonStringify } from '../../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

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
        <dl className={`grid grid-cols-1 gap-y-2 ${className}`} {...props}>
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
        valueOutput = 
        
            <span className={`${value ? 'text-green-500 bg-green-100/50' : 'text-red-500 bg-red-100/50' } text-sm px-3 py-2 inline-flex gap-2 items-center justify-center`}>
            <FontAwesomeIcon className={`${value} ? 'text-emerald-500' : 'text-red-500`} icon={value? faCheck : faTimes}/>
                <span className="font-mono">{ value ? 'true' : 'false' }</span>
            </span>;
    } else if (typeof value === 'object') {
        valueOutput = <CodeSnippet value={jsonStringify(value)} />;
    } else if (typeof value === 'string') {
        valueOutput = <CodeSnippet value={value} />;
    }

    return (
        <div className={`flex items-baseline gap-10 ${className}`}>
            <dt className="flex-none w-32 truncate">{label}</dt>
            <dd className="flex-grow min-w-0">{valueOutput}</dd>
        </div>
    );
}


import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useEffect, useState } from 'react';
import {copyToClipboard} from "../../util";
import RoundedButton from './RoundedButton';

type Props = {
    value: string;
    className?: string;
    alwaysVisible?: boolean;
    direction?: 'left' | 'right';
}

export default function CopyButton({value, className = '', alwaysVisible = false, direction = 'right'}: Props) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let timeout: number;

        if (copied) {
            timeout = window.setTimeout(() => setCopied(false), 3000);
        }

        return () => window.clearTimeout(timeout);
    }, [copied]);

    function copy(event: MouseEvent) {
        event.preventDefault();
        copyToClipboard(value);
        setCopied(true);
    }

    return (
        <div className={className}>
            <RoundedButton
                onClick={copy}
                title="Copy to clipboard"
                className={`
                    ${alwaysVisible? '' : 'opacity-0 transform scale-80 transition-animation delay-100'}
                    ${copied ? 'opacity-0' : 'group-hover:opacity-100 group-hover:scale-100'}
                `}
            >
                <FontAwesomeIcon icon={faCopy} />
            </RoundedButton>
            {copied && (
                <p
                    className={`absolute top-0 ${direction == 'right'? 'right-0' : 'left-0'} hidden z-10 sm:inline-flex gap-2 items-center h-6 px-2 rounded-sm ~bg-white shadow text-xs font-medium whitespace-nowrap text-emerald-500`}
                    onClick={() => setCopied(false)}
                >
                    Copied!
                </p>
            )}
        </div>
        
    )
}

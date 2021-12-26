import React, {useEffect, useState } from 'react';
import {copyToClipboard} from "../../util";

type Props = {
    value: string;
}

export default function CopyButton({value}: Props) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let timeout: number;

        if (copied) {
            timeout = window.setTimeout(() => setCopied(false), 3000);
        }

        return () => window.clearTimeout(timeout);
    }, [copied]);

    function copy() {
        copyToClipboard(value);
        setCopied(true);
    }

    return (
        <button
            onClick={copy}
            title="Copy to clipboard"
            className={`hover:text-indigo-500 opacity-0 transition-opacity duration-150 ${
                copied ? '' : 'group-hover:opacity-100'
            }`}
        >
            <i className="far fa-copy"/>
        </button>
    )
}

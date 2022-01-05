import React from 'react';
import useEditorUrl from '../../../hooks/useEditorUrl';
import { ErrorFrame } from '../../../types';
import Highlight from 'prism-react-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

type Token = {
    types: string[];
    content: string;
    empty?: boolean;
};

type Props = {
    highlight: boolean;
    line: Token[];
    frame: ErrorFrame;
    lineNumber: number;
    getTokenProps: Highlight['getTokenProps'];
};

export default function FrameCodeSnippetLine({ highlight, line, frame, lineNumber, getTokenProps, ...props }: Props) {
    const editorUrl = useEditorUrl({ file: frame.file, lineNumber });

    return (
        <span
            {...props}
            className={`
                block group pl-6 leading-loose hover:~bg-red-500/10
                ${highlight ? ' ~bg-red-500/20' : ''}
            `}
        >
            {editorUrl && (
                <span className="z-30 opacity-0 group-hover:opacity-100 sticky left-10 -ml-6 w-0 h-full">
                    <a
                        href={editorUrl}
                        className="-ml-3 shadow-md ~bg-white ~text-gray-500 hover:text-indigo-500 w-6 h-6 rounded-full inline-flex items-center justify-center text-xs "
                    >
                        <FontAwesomeIcon className="text-xs" icon={faPencilAlt}/>
                    </a>
                </span>
            )}

            {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
            ))}

        </span>
    );
}

import React from 'react';
import useEditorUrl from '../../../hooks/useEditorUrl';
import { ErrorFrame } from '../../../types';
import Highlight from 'prism-react-renderer';

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
                block group pl-3 leading-loose hover:~bg-red-500/10
                ${highlight ? ' ~bg-red-500/20' : ''}
            `}
        >
            {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
            ))}

            {editorUrl && (
                <a
                    href={editorUrl}
                    className="sticky left-8 -mt-6 -ml-5 z-30 opacity-0 shadow-md ~bg-white ~text-gray-500 hover:text-red-500 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-xs "
                >
                    <i className="fas fa-pencil-alt" />
                </a>
            )}
        </span>
    );
}

import React from 'react';
import { IThemedToken } from 'shiki';
import useOpenEditorUrl from '../../../hooks/useOpenEditorUrl';
import { ErrorFrame } from '../../../types';

type Props = {
    highlight: boolean;
    tokens: Array<IThemedToken>;
    frame: ErrorFrame;
    lineNumber: number;
};

export default function FrameCodeSnippetLine({ highlight, tokens, frame, lineNumber }: Props) {
    const editorUrl = useOpenEditorUrl({ file: frame.file, lineNumber });

    return (
        <span
            className={`
                block group pl-3 leading-loose hover:~bg-red-500/10
                ${highlight ? ' ~bg-red-500/20' : ''}
            `}
        >
            {!tokens.length && <>&nbsp;</>}
            {!!tokens.length &&
                tokens.map((token, index) => (
                    <span key={index} style={{ color: token.color }}>
                        {token.content || <>&nbsp;</>}
                    </span>
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

import React from 'react';
import RelaxedFilePath from './RelaxedFilePath';
import useEditorUrl from '../../hooks/useEditorUrl';

type Props = {
    path: string;
    lineNumber?: number;
    className?: string;
};

export default function EditorLink({ path, lineNumber, className }: Props) {
    const editorUrlData = useEditorUrl({ file: path, lineNumber });

    return (
        <a href={editorUrlData.url || '#'} onClick={editorUrlData.onClick} className={`hover:underline ${className}`}>
            <RelaxedFilePath path={path} lineNumber={lineNumber} />
        </a>
    );
}

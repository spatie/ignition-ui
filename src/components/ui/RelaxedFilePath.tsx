import React from 'react';

type Props = {
    path: string;
};

export default function RelaxedFilePath({ path }: Props) {
    const parts = path.split('/');
    const fileParts = parts.pop()?.split('.') || [];
    const extension = fileParts.pop();
    const fileName = fileParts.join('.');

    return (
        <span className="group">
            {parts.map((part, index) => (
                <span key={index} className="group-hover:underline">
                    {part}
                    <span className="mx-0.5">/</span>
                    <wbr />
                </span>
            ))}
            <span className="group-hover:underline font-semibold">{fileName}</span>
            <span className="group-hover:underline">.{extension}</span>
        </span>
    );
}

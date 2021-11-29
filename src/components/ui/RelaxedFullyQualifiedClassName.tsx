import React from 'react';

type Props = {
    path: string;
};

export default function RelaxedFullyQualifiedClassName({ path }: Props) {
    const parts = path.split('\\');

    return (
        <>
            {parts.map((part, index) => (
                <span key={index}>
                    {part}
                    {index !== parts.length - 1 && <span className="mx-0.5">\</span>}
                    <wbr />
                </span>
            ))}
        </>
    );
}

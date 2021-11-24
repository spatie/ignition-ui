import React from 'react';

type Props = {
    path: string;
    divider?: string;
};

export default function RelaxedPath({path, divider = '/'}: Props) {
    const parts = path.split(divider);

    return <>
        {parts.map((part, index) => <span key={part}>
            {part}
            {index !== parts.length - 1 && <span className="mx-0.5">{divider}</span>}
        </span>)}
    </>;
}

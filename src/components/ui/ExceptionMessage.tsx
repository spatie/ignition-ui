import React, { useState } from 'react';

type Props = {
    message: string;
    className?: string;
};

export default function ExceptionMessage({ message, className = '' }: Props) {
    const [fullException, setFullException] = useState<boolean>(false);

    return (
        <div
            className={`
                my-4 font-semibold leading-snug text-xl
                ${className}
            `}
            onClick={() => setFullException(!fullException)}
        >
            <div className={fullException ? 'line-clamp-none' : 'line-clamp-2'}>{message}</div>
        </div>
    );
}

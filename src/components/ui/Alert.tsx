import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

type Props = { children: React.ReactNode; className?: string };

export default function Alert({ children, className = '' }: Props) {
    return (
        <div className={`my-6 ${className}`}>
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 inline-flex items-center justify-center rounded-full flex-shrink-0 bg-yellow-400 dark:bg-yellow-500" aria-hidden="true">
                    <FontAwesomeIcon className="text-sm text-white" icon={faExclamation} />
                </div>
                <p className="font-semibold text-sm">{children}</p>
            </div>
        </div>
    );
}

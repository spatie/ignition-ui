import React from 'react';

type Props = { children: React.ReactNode; className?: string };

export default function Alert({ children, className = '' }: Props) {
    return (
        <div className={`bg-yellow-50 border-l-4 border-yellow-400 p-4 ${className}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <i className="fas fa-exclamation-triangle text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-yellow-700">{children}</p>
                </div>
            </div>
        </div>
    );
}

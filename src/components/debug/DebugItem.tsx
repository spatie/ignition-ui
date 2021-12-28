import React from 'react';
import ContextList from '../context/ContextList';
import { LogLevel } from '../../types';

type Props = {
    children: React.ReactNode;
    context?: Record<string, string | object> | null;
    level?: LogLevel | null;
};

export default function DebugItem({ children, context = null, level = null }: Props) {
    const logLevelColors = {
        error: 'bg-red-500',
        warn: 'bg-orange-500',
        warning: 'bg-orange-500',
        info: 'bg-blue-500',
        debug: 'bg-green-500',
        trace: 'bg-gray-500',
        notice: 'bg-purple-500',
        critical: 'bg-red-500',
        alert: 'bg-red-500',
        emergency: 'bg-red-500',
    } as Record<LogLevel, string>;

    return (
        <div className="px-6 py-3 my-3 border-b-2 sm:px-10">
            {level && (
                <span
                    className={`
                        ${logLevelColors[level] || 'bg-color-gray-500'}
                        text-white rounded py-1 px-2 shadow-sm
                    `}
                >
                    {level}
                </span>
            )}

            {children}

            {context && (
                <div className="grid grid-cols-[8rem,minmax(0,1fr)] gap-x-10 gap-y-2">
                    <ContextList items={context} />
                </div>
            )}
        </div>
    );
}

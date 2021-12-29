import React, { useState } from 'react';
import ContextList from '../context/ContextList';
import { LogLevel } from '../../types';
import CodeSnippet from '../ui/CodeSnippet';
import Button from '../ui/Button';
import { jsonStringify } from '../../util';

type Props = {
    children: React.ReactNode;
    context?: Record<string, string | object> | null;
    time: Date;
    level?: LogLevel | null;
    meta?: Record<string, string | number> | null;
};

export default function DebugItem({ children, context = null, level = null, meta = null, time }: Props) {
    const [showRawContext, setShowRawContext] = useState(false); // TODO: Implement this

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
            {children}

            <div className="flex align-baseline text-sm gap-1">
                {level && (
                    <span
                        className={`
                            ${logLevelColors[level] || 'bg-color-gray-500'}
                            text-white rounded-full px-2 shadow-sm
                        `}
                    >
                        {level}
                    </span>
                )}
                {meta &&
                    Object.entries(meta).map(([key, value]) => (
                        <span key={key} className="rounded-full px-2 ~bg-white text-gray-500 shadow-sm">
                            {key}: {value}
                        </span>
                    ))}
                <span className="ml-auto text-sm text-gray-700">{time.toLocaleTimeString()}</span>
            </div>

            {context && (
                <div className="mt-2">
                    <Button onClick={() => setShowRawContext(!showRawContext)}>
                        {showRawContext ? <i className="fas fa-th-list" /> : <i className="fas fa-code" />}
                    </Button>
                    {showRawContext ? (
                        <CodeSnippet value={jsonStringify(context)} />
                    ) : (
                        <div className="grid grid-cols-[8rem,minmax(0,1fr)] gap-x-10 gap-y-2">
                            <ContextList items={context} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

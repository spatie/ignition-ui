import React, { useEffect, useRef, useState } from 'react';
import { copyToClipboard } from '../../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCopy } from '@fortawesome/free-solid-svg-icons';
import sqlFormatter from 'sql-formatter';

type Props = {
    value: string;
    limitHeight?: boolean;
    language?: null | 'sql';
    transparent?: boolean;
    overflowX?: boolean;
};

// TODO: Json/Curl editor?

export default function CodeSnippet({
    value,
    limitHeight = true,
    language = null,
    transparent = false,
    overflowX = true,
}: Props) {
    const [copied, setCopied] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(limitHeight);
    const [isOverflowing, setIsOverflowing] = useState(language === 'sql');
    const ref = useRef<HTMLPreElement>(null);

    useEffect(() => {
        if (ref.current) {
            setIsOverflowing(ref.current.scrollHeight > ref.current.clientHeight);
        }
    }, [ref.current, isCollapsed, value, limitHeight]);

    useEffect(() => {
        let timeout: number;

        if (copied) {
            timeout = window.setTimeout(() => setCopied(false), 3000);
        }

        return () => window.clearTimeout(timeout);
    }, [copied]);

    function copy(event: React.MouseEvent) {
        event.stopPropagation();
        copyToClipboard(value);
        setCopied(true);
    }

    return (
        <div
            className={`
                ${isOverflowing ? 'cursor-pointer' : ''}
                ${transparent ? '' : '~bg-gray-500/5'}
                group py-2`}
            onClick={() => (isOverflowing ? setIsCollapsed(!isCollapsed) : null)}
        >
            <div className={`${overflowX ? 'mask-fade-x' : ''}`}>
                {language === 'sql' && (
                    <>
                        {isCollapsed ? (
                            <pre
                                className={`pl-4 ${
                                    overflowX ? 'overflow-x-scroll scrollbar-hidden-x pr-12' : 'truncate pr-8'
                                }`}
                            >
                                <code className="font-mono leading-relaxed text-sm font-normal">{value}</code>
                            </pre>
                        ) : (
                            <pre
                                className={`pl-4 ${overflowX ? 'overflow-x-scroll scrollbar-hidden-x pr-12' : 'pr-8'}`}
                            >
                                <code className="font-mono leading-relaxed text-sm font-normal">
                                    {sqlFormatter.format(value, { language: 'mysql' })}
                                </code>
                            </pre>
                        )}
                    </>
                )}
                {language !== 'sql' && (
                    <pre
                        ref={ref}
                        className={`
                            pl-4
                            ${isOverflowing ? 'mask-fade-y -mb-2' : ''}
                            ${isCollapsed ? 'overflow-y-hidden max-h-32' : ''}
                            ${overflowX ? 'overflow-x-scroll scrollbar-hidden-x pr-12' : 'pr-8'}
                        `}
                    >
                        <code className="font-mono leading-relaxed text-sm font-normal">{value}</code>
                    </pre>
                )}
            </div>

            <button
                onClick={copy}
                title="Copy to clipboard"
                className={`absolute top-2 right-2 ~text-gray-500 hover:text-indigo-500 opacity-0
                    transform scale-80 transition-animation delay-100
                    ${copied ? '' : 'group-hover:opacity-100 group-hover:scale-100'}
                `}
            >
                <FontAwesomeIcon icon={faCopy} />
            </button>
            {copied && (
                <p
                    className="hidden z-10 sm:inline-flex absolute top-2 right-2 gap-2 items-center h-6 px-2 rounded-sm ~bg-white shadow text-xs font-medium whitespace-nowrap text-emerald-500"
                    onClick={() => setCopied(false)}
                >
                    Copied!
                </p>
            )}
            {isOverflowing && (
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -bottom-3 left-1/2 w-6 h-6 -translate-x-1/2 rounded-full flex items-center justify-center
                    text-xs ~bg-white text-indigo-500 hover:shadow-lg
                    opacity-0 transform scale-80 transition-animation delay-100 shadow-md
                    group-hover:opacity-100 group-hover:scale-100
                    active:shadow-sm active:translate-y-px"
                >
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        className={`transition-transform duration-300 transform ${isCollapsed ? '' : 'rotate-180'}`}
                    />
                </button>
            )}
        </div>
    );
}

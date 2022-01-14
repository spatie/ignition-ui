import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import sqlFormatter from 'sql-formatter';
import CopyButton from './CopyButton';

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
    const [isCollapsed, setIsCollapsed] = useState(limitHeight);
    const [isOverflowing, setIsOverflowing] = useState(language === 'sql');
    const ref = useRef<HTMLPreElement>(null);

    useEffect(() => {
        if (ref.current) {
            setIsOverflowing(ref.current.scrollHeight > ref.current.clientHeight);
        }
    }, [ref.current, isCollapsed, value, limitHeight]);

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

            <CopyButton className="absolute top-2 right-3" value={value}/>

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

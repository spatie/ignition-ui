import React, {useState, useEffect} from 'react';
import {getHighlighter, IThemedToken, setCDN} from 'shiki';
import {ErrorFrame} from "../../../types";

type Props = {
    frame: ErrorFrame;
}

export default function FrameCodeSnippet({frame}: Props) {
    const [tokenizedCode, setTokenizedCode] = useState<IThemedToken[][]>([]);

    const lineNumbers = Object.keys(frame.code_snippet);
    const highlightedIndex = lineNumbers.indexOf(frame.line_number.toString());

    // TODO: bundle themes and language definitions. Don't rely on CDN.
    setCDN('https://unpkg.com/shiki/');

    useEffect(() => {
        // Set un-highlighted code tokens first.
        setTokenizedCode(Object.values(frame.code_snippet).map(line => ([{content: line}])));

        getHighlighter({
            theme: 'github-light',
            langs: ['php'], // TODO: blade?
        }).then((highlighter) => {
            const code = Object.values(frame.code_snippet).join('\n');

            const lines = highlighter.codeToThemedTokens(code, 'php');

            // TODO: Somehow remember these highlighted tokens per frame?
            setTokenizedCode(lines);
        });
    }, [frame]);

    return (
        <main
            className="flex items-stretch flex-grow overflow-x-auto overflow-y-hidden scrollbar-hidden-x mask-fade-x text-sm"
        >
            <nav className="sticky left-0 flex flex-none z-20 ~bg-white">
                <div className="select-none">
                    {lineNumbers.map((number) => (
                        <p
                            key={number}
                            className={`
                                        px-2 font-mono leading-loose select-none cursor-pointer
                                        ${
                                Number(number) === frame.line_number
                                    ? ' text-opacity-75 ~text-red-700 ~bg-red-500/30'
                                    : ''
                            }
                                    `}
                        >
                            <span className="~text-gray-500">{number}</span>
                        </p>
                    ))}
                </div>
            </nav>
            <div className="flex-grow pr-10">
                <pre>
                    <code>
                        {tokenizedCode.map((tokens, index) => (
                            <span
                                key={index}
                                className={`
                                    block group pl-3 leading-loose hover:~bg-red-500/10
                                    ${index === highlightedIndex ? ' ~bg-red-500/20' : ''}
                                `}
                            >
                                {!tokens.length && <>&nbsp;</>}
                                {!!tokens.length &&
                                tokens.map((token, index) => {
                                    return <span key={index} style={{color: token.color}}>{token.content || <>&nbsp;</>}</span>;
                                })}
                                <a
                                    href="#"
                                    className="sticky left-8 -mt-6 -ml-5 z-30 opacity-0 shadow-md ~bg-white ~text-gray-500 hover:text-red-500 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-xs "
                                >
                                    <i className="fas fa-pencil-alt"/>
                                </a>
                            </span>
                        ))}
                    </code>
                </pre>
            </div>
        </main>
    )
}

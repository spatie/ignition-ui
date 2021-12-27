import React, { useState, useEffect, useContext } from 'react';
import { getHighlighter, IThemedToken, setCDN } from 'shiki';
import { ErrorFrame } from '../../../types';
import FrameCodeSnippetLine from './FrameCodeSnippetLine';
import IgnitionConfigContext from '../../../contexts/IgnitionConfigContext';

type Props = {
    frame: ErrorFrame;
};

type TokenizedCodeWithLineNumbers = {
    lineNumber: number;
    tokens: IThemedToken[];
};

export default function FrameCodeSnippet({ frame }: Props) {
    const { theme } = useContext(IgnitionConfigContext);
    const [tokenizedCode, setTokenizedCode] = useState<TokenizedCodeWithLineNumbers[]>([]);

    const lineNumbers = Object.keys(frame.code_snippet).map((n) => Number(n));
    const highlightedIndex = lineNumbers.indexOf(frame.line_number);

    // TODO: bundle themes and language definitions. Don't rely on CDN.
    setCDN('https://unpkg.com/shiki/');

    useEffect(() => {
        // Set un-highlighted code tokens first.
        setTokenizedCode(
            Object.values(frame.code_snippet).map((line, index) => ({
                lineNumber: lineNumbers[index],
                tokens: [{ content: line }],
            })),
        );

        getHighlighter({
            theme: theme === 'light' ? 'github-light' : 'github-dark',
            langs: ['php'], // TODO: blade?
        }).then((highlighter) => {
            const code = Object.values(frame.code_snippet).join('\n');

            const lines = highlighter.codeToThemedTokens(code, 'php');

            // TODO: Somehow remember these highlighted tokens per frame?
            setTokenizedCode(
                lines.map((line, index) => ({
                    lineNumber: lineNumbers[index],
                    tokens: line,
                })),
            );
        });
    }, [frame, theme]);

    return (
        <main className="flex items-stretch flex-grow overflow-x-auto overflow-y-hidden scrollbar-hidden-x mask-fade-x text-sm">
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
                        {tokenizedCode.map(({ tokens, lineNumber }, index) => (
                            <FrameCodeSnippetLine
                                key={index}
                                frame={frame}
                                highlight={index === highlightedIndex}
                                tokens={tokens}
                                lineNumber={lineNumber}
                            />
                        ))}
                    </code>
                </pre>
            </div>
        </main>
    );
}

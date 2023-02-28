import React, { useMemo } from 'react';
import { ErrorFrame } from '../../../types';
import FrameCodeSnippetLine from './FrameCodeSnippetLine';
// @ts-ignore
import { createElement, Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
// @ts-ignore
import phpTemplate from 'react-syntax-highlighter/dist/esm/languages/hljs/php-template';
// @ts-ignore
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
// @ts-ignore
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
// @ts-ignore
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
// @ts-ignore
import handlebars from 'react-syntax-highlighter/dist/esm/languages/hljs/handlebars';
import blade from 'languages/blade';

// We need to register all styles and languages manually if we want to use the light
// export of the SyntaxHighlighter. Including all sub-languages used in e.g. Blade:
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('php-template', phpTemplate);
SyntaxHighlighter.registerLanguage('blade', blade);
SyntaxHighlighter.registerLanguage('xml', xml);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('handlebars', handlebars);

type RendererProps = {
    rows: Row[];
};

export type Row = Node[];

type Node = {
    type: string;
    tagName?: string;
    properties: { className: null | string };
    children: Node[];
};

type Props = {
    frame: ErrorFrame;
};

function getLanguage(filename: string): 'php' | 'blade' | 'php-template' {
    if (filename.endsWith('.blade.php')) {
        return 'blade';
    }

    if (filename.match(/^resources\/views\//)) {
        return 'php-template';
    }

    return 'php';
}

export default function FrameCodeSnippet({ frame }: Props) {
    const code = Object.values(frame.code_snippet).join('\n');

    const lineNumbers = Object.keys(frame.code_snippet).map((n) => Number(n));
    const highlightedIndex = lineNumbers.indexOf(frame.line_number);

    const codeRenderer = useMemo(
        () =>
            ({ rows }: RendererProps) => {
                return rows.map((row, index) => (
                    <FrameCodeSnippetLine
                        key={lineNumbers[index]}
                        frame={frame}
                        highlight={index === highlightedIndex}
                        row={row}
                        lineNumber={lineNumbers[index]}
                    />
                ));
            },
        [frame],
    );

    return (
        <main className="flex items-stretch flex-grow overflow-x-auto overflow-y-hidden scrollbar-hidden-x mask-fade-r text-sm">
            <nav className="sticky left-0 flex flex-none z-20 ~bg-white">
                <div className="select-none text-right">
                    {lineNumbers.map((number) => (
                        <p
                            key={number}
                            className={`
                                px-2 font-mono leading-loose select-none
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
                <SyntaxHighlighter
                    language={getLanguage(frame.relative_file)}
                    renderer={codeRenderer}
                    customStyle={{ background: 'transparent' }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </main>
    );
}

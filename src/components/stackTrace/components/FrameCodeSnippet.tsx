import React, { useContext } from 'react';
import { ErrorFrame } from '../../../types';
import FrameCodeSnippetLine from './FrameCodeSnippetLine';
import IgnitionConfigContext from '../../../contexts/IgnitionConfigContext';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Prism from 'prismjs';
import dark from '../../../themes/dark.js';
import light from '../../../themes/light.js';

import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';


type Props = {
    frame: ErrorFrame;
};

export default function FrameCodeSnippet({ frame }: Props) {
    const { theme } = useContext(IgnitionConfigContext);

    const code = Object.values(frame.code_snippet).join('\n');

    const lineNumbers = Object.keys(frame.code_snippet).map((n) => Number(n));
    const highlightedIndex = lineNumbers.indexOf(frame.line_number);

    return (
        <main className="flex items-stretch flex-grow overflow-x-auto overflow-y-hidden scrollbar-hidden-x mask-fade-r text-sm">
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
                <Highlight
                    {...defaultProps}
                    Prism={Prism as any}
                    code={code}
                    // @ts-ignore
                    language={frame.relative_file.endsWith('blade.php') ? 'html' : 'php'}
                    theme={theme === 'dark' ? dark : light}
                >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre className={className} style={style}>
                            {tokens.map((line, index) => (
                                <FrameCodeSnippetLine
                                    {...getLineProps({ line, key: index })}
                                    frame={frame}
                                    highlight={index === highlightedIndex}
                                    line={line}
                                    lineNumber={lineNumbers[index]}
                                    getTokenProps={getTokenProps}
                                />
                            ))}
                        </pre>
                    )}
                </Highlight>

                {/*<pre>*/}
                {/*    <code>*/}
                {/*        {tokenizedCode.map(({ tokens, lineNumber }, index) => (*/}
                {/*            <FrameCodeSnippetLine*/}
                {/*                key={index}*/}
                {/*                frame={frame}*/}
                {/*                highlight={index === highlightedIndex}*/}
                {/*                tokens={tokens}*/}
                {/*                lineNumber={lineNumber}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </code>*/}
                {/*</pre>*/}
            </div>
        </main>
    );
}

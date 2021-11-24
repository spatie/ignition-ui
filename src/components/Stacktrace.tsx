import React, {useContext, useEffect, useState} from 'react';
import {getHighlighter, setCDN} from 'shiki';
import ErrorOccurrenceContext from './contexts/ErrorOccurrenceContext';

export default function Stacktrace() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const [highlightedCode, setHighlightedCode] = useState<JSX.Element[]>();

    const frame = errorOccurrence.frames[0];
    const lineNumbers = Object.keys(frame.code_snippet);

    // TODO: bundle themes and language definitions. Don't rely on CDN.
    setCDN('https://unpkg.com/shiki/');

    useEffect(() => {
        getHighlighter({
            theme: 'github-light',
            langs: ['php'], // TODO: blade?
        }).then(highlighter => {
            const code = Object.values(errorOccurrence.frames[0].code_snippet).join('\n');

            const highlightedIndex = lineNumbers.indexOf(errorOccurrence.frames[0].line_number.toString());

            const lines = highlighter.codeToThemedTokens(code, 'php');

            const highlightedLines = lines.map((tokens, index) => (
                <span className={`
                block group pl-3 leading-loose hover:~bg-red-500/10
                ${index === highlightedIndex ? ' ~bg-red-500/20' : ''}
                `}>
                    {!tokens.length && <>&nbsp;</>}
                    {!!tokens.length && tokens.map(token => {
                        return <span style={{color: token.color}}>{token.content}</span>;
                    })}
                    <a href='#'
                       className='sticky left-8 -mt-6 -ml-5 z-30 opacity-0 shadow-md ~bg-white ~text-gray-500 hover:text-red-500 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-xs '>
                        <i className='fas fa-pencil-alt'/>
                    </a>
                </span>
            ));

            setHighlightedCode(highlightedLines);
        });
    }, [errorOccurrence.frames[0]]);

    return (
        <section className="mt-20 grid 2xl:row-span-3 2xl:row-start-1 2xl:col-start-2">
            <a id="stack" className="z-50 absolute top-[-7.5rem]"/>
            <div className="
                  grid grid-cols-1
                  lg:grid-cols-6
                  items-stretch
                  min-h-50vh
                  lg:max-h-[calc(100vh-10rem)]
                  2xl:max-h-[calc(100vh-7.5rem)]
                  shadow-lg
                  ~bg-white
              ">
                <aside className="z-30 lg:col-span-2 flex flex-col border-r ~border-gray-200 lg:max-h-[calc(100vh-10rem)]
              2xl:max-h-[calc(100vh-7.5rem)]">
                    <div
                        className="max-h-[33vh] lg:max-h-[none] lg:absolute inset-0 flex flex-col overflow-hidden ~bg-white">
                        <header
                            className="flex-none px-6 sm:px-10 h-16 flex items-center justify-start ~bg-white border-b ~border-gray-200">
                            <button
                                className="h-6 px-2 rounded-sm ~bg-gray-500/5 hover:text-red-500 text-xs font-medium whitespace-nowrap">
                                Expand vendor frames
                            </button>
                        </header>
                        <div id="frames"
                             className="flex-grow overflow-auto scrollbar-hidden-y mask-fade-frames">
                            <ol className="text-sm">
                                <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">
                                    <div className="flex items-baseline">
                                        <span className="inline-flex">
                                            <span>Illuminate
                                                <span className="mx-0.5">\</span>
                                                <wbr/>
                                            </span>
                                            <span>Database
                                                <span className="mx-0.5">\</span>
                                                <wbr/>
                                            </span>
                                            <span>Connection
                                                <wbr/>
                                            </span>
                                        </span>
                                        <span className="px-1 font-mono text-xs">:346</span>
                                    </div>
                                    <div className="font-semibold">runQueryCallback</div>
                                </li>
                                <li className="px-6 sm:px-10 py-4 bg-red-500 text-white">
                                    <div className="ml-[-4px] flex items-baseline">
                                        <span className="inline-flex">
                                            <span>Illuminate
                                                <span className="mx-0.5">\</span>
                                                <wbr/>
                                            </span>
                                            <span>Database
                                                <span className="mx-0.5">\</span>
                                                <wbr/>
                                            </span>
                                            <span>Connection
                                                <wbr/>
                                            </span>
                                        </span>
                                        <span className="px-1 font-mono text-xs">:346</span>
                                    </div>
                                    <div className="ml-[-4px] font-semibold">runQueryCallback</div>
                                </li>
                                <li className="z-10 mt-[-4px] sticky top-0 bg-red-500 h-[4px]">
                                </li>
                                <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">
                                    <div className="flex items-baseline">
                                        <span className="inline-flex">
                                            <span>Illuminate
                                                <span className="mx-0.5">\</span>
                                                <wbr/>
                                            </span>
                                            <span>Database
                                                <span className="mx-0.5">\</span>
                                                <wbr/>
                                            </span>
                                            <span>Connection
                                                <wbr/>
                                            </span>
                                        </span>
                                        <span className="px-1 font-mono text-xs">:346</span>
                                    </div>
                                    <div className="font-semibold">runQueryCallback</div>
                                </li>
                                <li className="
                                  group
                                      px-6 sm:px-10
                                      py-4
                                      flex
                                      lg:justify-start
                                      border-b ~border-gray-200
                                      hover:~bg-red-500/10
                                  ">
                                    <button className="flex items-center">
                                        10 vendor frames
                                        <i className="ml-2 fas fa-angle-down ~text-gray-500 group-hover:text-red-500"/>
                                    </button>
                                </li>
                                <li className="
                                  px-6 sm:px-10
                                      py-4
                                      border-b ~border-gray-200
                                      flex
                                      lg:justify-start
                                  ">
                                    <span className="~text-gray-500">1 unknown frame</span>
                                </li>
                                <li className="
                                  group
                                  px-6 sm:px-10
                                      py-4
                                      flex
                                      lg:justify-start
                                      border-b ~border-gray-200
                                      hover:~bg-red-500/10
                                  ">
                                    <button className="flex items-center">
                                        10 vendor frames
                                        <i className="ml-2 fas fa-angle-down ~text-gray-500 group-hover:text-red-500"/>
                                    </button>
                                </li>
                                <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">
                                    <div className="flex items-baseline">
                                        <span className="inline-flex">
                                            <span>index
                                                <wbr/>
                                            </span>
                                            <span>.php
                                                <wbr/>
                                            </span>
                                        </span>
                                        <span className="px-1 font-mono text-xs">:3</span>
                                    </div>
                                    <div className="font-semibold">bootstrap</div>
                                </li>
                                <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">
                                    <div className="flex items-baseline">
                                        <span className="inline-flex">
                                            <span>index
                                                <wbr/>
                                            </span>
                                            <span>.php
                                                <wbr/>
                                            </span>
                                        </span>
                                        <span className="px-1 font-mono text-xs">:3</span>
                                    </div>
                                    <div className="font-semibold">bootstrap</div>
                                </li>
                                <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">
                                    <div className="flex items-baseline">
                                        <span className="inline-flex">
                                            <span>index
                                                <wbr/>
                                            </span>
                                            <span>.php
                                                <wbr/>
                                            </span>
                                        </span>
                                        <span className="px-1 font-mono text-xs">:3</span>
                                    </div>
                                    <div className="font-semibold">bootstrap</div>
                                </li>
                                <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">
                                    <div className="flex items-baseline">
                                        <span className="inline-flex">
                                            <span>index
                                                <wbr/>
                                            </span>
                                            <span>.php
                                                <wbr/>
                                            </span>
                                        </span>
                                        <span className="px-1 font-mono text-xs">:3</span>
                                    </div>
                                    <div className="font-semibold">bootstrap</div>
                                </li>
                                <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">
                                    <div className="flex items-baseline">
                                        <span className="inline-flex">
                                            <span>index
                                                <wbr/>
                                            </span>
                                            <span>.php
                                                <wbr/>
                                            </span>
                                        </span>
                                        <span className="px-1 font-mono text-xs">:3</span>
                                    </div>
                                    <div className="font-semibold">bootstrap</div>
                                </li>
                                <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">
                                    <div className="flex items-baseline">
                                        <span className="inline-flex">
                                            <span>index
                                                <wbr/>
                                            </span>
                                            <span>.php
                                                <wbr/>
                                            </span>
                                        </span>
                                        <span className="px-1 font-mono text-xs">:3</span>
                                    </div>
                                    <div className="font-semibold">bootstrap</div>
                                </li>
                                <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">
                                    <div className="flex items-baseline">
                                        <span className="inline-flex">
                                            <span>index
                                                <wbr/>
                                            </span>
                                            <span>.php
                                                <wbr/>
                                            </span>
                                        </span>
                                        <span className="px-1 font-mono text-xs">:3</span>
                                    </div>
                                    <div className="font-semibold">bootstrap</div>
                                </li>
                                <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">
                                    <div className="flex items-baseline">
                                        <span className="inline-flex">
                                            <span>index
                                                <wbr/>
                                            </span>
                                            <span>.php
                                                <wbr/>
                                            </span>
                                        </span>
                                        <span className="px-1 font-mono text-xs">:3</span>
                                    </div>
                                    <div className="font-semibold">bootstrap</div>
                                </li>
                                <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">
                                    <div className="flex items-baseline">
                                        <span className="inline-flex">
                                            <span>index
                                                <wbr/>
                                            </span>
                                            <span>.php
                                                <wbr/>
                                            </span>
                                        </span>
                                        <span className="px-1 font-mono text-xs">:3</span>
                                    </div>
                                    <div className="font-semibold">bootstrap</div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </aside>
                <section className="lg:max-h-[calc(100vh-10rem)]
              2xl:max-h-[calc(100vh-7.5rem)] flex flex-col lg:col-span-4 border-t lg:border-t-0 ~border-gray-200">
                    <header
                        className="~text-gray-500 flex-none z-30 h-16 px-6 sm:px-10 flex items-center justify-end">
                        <a href="#" className="group flex items-center text-sm">
                            <span>…
                                <span className="px-0.5">/</span>
                            </span>
                            <span className="group-hover:underline">Illuminate
                                <span className="px-0.5">/</span>
                            </span>
                            <span className="group-hover:underline">Database
                                <span className="px-0.5">/</span>
                            </span>
                            <span className="group-hover:underline font-semibold">Connection</span>
                            <span>.php</span>
                        </a>
                    </header>
                    <main
                        className="flex items-stretch flex-grow overflow-x-auto overflow-y-hidden scrollbar-hidden-x mask-fade-x text-sm">
                        <nav className="sticky left-0 flex flex-none z-20 ~bg-white">
                            <div className="select-none">
                                {lineNumbers.map(number => (
                                    <p key={number} className={`
                                        px-2 font-mono leading-loose select-none cursor-pointer
                                        ${Number(number) === frame.line_number ? ' text-opacity-75 ~text-red-700 ~bg-red-500/30' : ''}
                                    `}>
                                        <span className="~text-gray-500">
                                            {number}
                                        </span>
                                    </p>
                                ))}
                            </div>
                        </nav>
                        <div className="flex-grow pr-10">
                            <pre><code>
                                {highlightedCode}
                            </code></pre>
                        </div>
                    </main>
                </section>
            </div>
        </section>
    )
}

import React, { useContext, useEffect, useLayoutEffect, useMemo, useReducer, useState } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import FrameCodeSnippet from "./FrameCodeSnippet";
import useKeyboardShortcut from "../../../hooks/useKeyboardShortcut";
import stackReducer from "../reducer";
import allVendorFramesAreExpanded from "../selectors/allVendorFramesAreExpanded";
import getFrameGroups from "../selectors/getFrameGroups";
import getSelectedFrame from "../selectors/getSelectedFrame";
import FrameGroup from "./FrameGroup";

type Props = {
    openFrameIndex?: number;
};

export default function StackTrace({ openFrameIndex }: Props) {
    const { frames } = useContext(ErrorOccurrenceContext);

    const initialState = useMemo(() => {
        let selectedFrame = frames.length;

        if (openFrameIndex) {
            selectedFrame = frames.length - openFrameIndex;
        }
        return stackReducer({ frames, expanded: [], selected: selectedFrame }, { type: 'COLLAPSE_ALL_VENDOR_FRAMES' });
    }, [frames]);

    const [state, dispatch] = useReducer(stackReducer, initialState);

    const vendorFramesExpanded = useMemo(() => allVendorFramesAreExpanded(state), [state]);
    const frameGroups = useMemo(() => getFrameGroups(state), [state]);
    const selectedFrame = useMemo(() => getSelectedFrame(state), [state]);

    useKeyboardShortcut('j', () => {
        dispatch({ type: 'SELECT_NEXT_FRAME' });
    });

    useKeyboardShortcut('k', () => {
        dispatch({ type: 'SELECT_PREVIOUS_FRAME' });
    });

    const [selectedRange, setSelectedRange] = useState<[number, number] | null>(null);

    useLayoutEffect(() => {
        const framePattern = /F([0-9]+)?/gm;
        const linePattern = /L([0-9]+)(-([0-9]+))?/gm;

        const frameMatches = framePattern.exec(window.location.hash);
        const lineMatches = linePattern.exec(window.location.hash);

        if (frameMatches) {
            const frameNumber = parseInt(frameMatches[1]);

            dispatch({ type: 'SELECT_FRAME', frame: frameNumber });
        }

        if (lineMatches) {
            const minLineNumber = parseInt(lineMatches[1]);
            const maxLineNumber = lineMatches[3] ? parseInt(lineMatches[3]) : minLineNumber;

            setSelectedRange([minLineNumber, maxLineNumber]);
        }
    }, []);

    useEffect(() => {
        const lineNumber = selectedRange
            ? selectedRange[0] === selectedRange[1]
                ? selectedRange[0]
                : `${selectedRange[0]}-${selectedRange[1]}`
            : null;

        window.history.replaceState(
            window.history.state,
            '',
            `#F${state.selected}${lineNumber ? 'L' + lineNumber : ''}`,
        );
    }, [state.selected, selectedRange]);

    return (
        <section className="mt-20 grid 2xl:row-span-3 2xl:row-start-1 2xl:col-start-2">
            <a id="stack" className="z-50 absolute top-[-7.5rem]" />
            <div
                className="
                  grid grid-cols-1
                  lg:grid-cols-6
                  items-stretch
                  min-h-50vh
                  lg:max-h-[calc(100vh-10rem)]
                  2xl:max-h-[calc(100vh-7.5rem)]
                  shadow-lg
                  ~bg-white
              "
            >
                <aside
                    className="z-30 lg:col-span-2 flex flex-col border-r ~border-gray-200 lg:max-h-[calc(100vh-10rem)]
              2xl:max-h-[calc(100vh-7.5rem)]"
                >
                    <div className="max-h-[33vh] lg:max-h-[none] lg:absolute inset-0 flex flex-col overflow-hidden ~bg-white">
                        <header className="flex-none px-6 sm:px-10 h-16 flex items-center justify-start ~bg-white border-b ~border-gray-200">
                            {vendorFramesExpanded ? (
                                <button
                                    className="h-6 px-2 rounded-sm ~bg-gray-500/5 hover:text-red-500 text-xs font-medium whitespace-nowrap"
                                    onClick={() => dispatch({ type: 'COLLAPSE_ALL_VENDOR_FRAMES' })}
                                >
                                    Collapse vendor frames
                                </button>
                            ) : (
                                <button
                                    className="h-6 px-2 rounded-sm ~bg-gray-500/5 hover:text-red-500 text-xs font-medium whitespace-nowrap"
                                    onClick={() => dispatch({ type: 'EXPAND_ALL_VENDOR_FRAMES' })}
                                >
                                    Expand vendor frames
                                </button>
                            )}
                        </header>
                        <div id="frames" className="flex-grow overflow-auto scrollbar-hidden-y mask-fade-frames">
                            {frameGroups.map((frameGroup, i) => (
                                <FrameGroup
                                    key={i}
                                    frameGroup={frameGroup}
                                    onExpand={() =>
                                        dispatch({
                                            type: 'EXPAND_FRAMES',
                                            frames: frameGroup.frames.map((frame) => frame.frame_number),
                                        })
                                    }
                                    onSelect={(frameNumber) => {
                                        dispatch({ type: 'SELECT_FRAME', frame: frameNumber });
                                        setSelectedRange(null);
                                    }}
                                />
                            ))}
                            {/*<ol className="text-sm">*/}
                            {/*    <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">*/}
                            {/*        <div className="flex items-baseline">*/}
                            {/*            <span className="inline-flex">*/}
                            {/*                <span>*/}
                            {/*                    Illuminate*/}
                            {/*                    <span className="mx-0.5">\</span>*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    Database*/}
                            {/*                    <span className="mx-0.5">\</span>*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    Connection*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*            </span>*/}
                            {/*            <span className="px-1 font-mono text-xs">:346</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="font-semibold">runQueryCallback</div>*/}
                            {/*    </li>*/}
                            {/*    <li className="px-6 sm:px-10 py-4 bg-red-500 text-white">*/}
                            {/*        <div className="ml-[-4px] flex items-baseline">*/}
                            {/*            <span className="inline-flex">*/}
                            {/*                <span>*/}
                            {/*                    Illuminate*/}
                            {/*                    <span className="mx-0.5">\</span>*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    Database*/}
                            {/*                    <span className="mx-0.5">\</span>*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    Connection*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*            </span>*/}
                            {/*            <span className="px-1 font-mono text-xs">:346</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="ml-[-4px] font-semibold">runQueryCallback</div>*/}
                            {/*    </li>*/}
                            {/*    <li className="z-10 mt-[-4px] sticky top-0 bg-red-500 h-[4px]"></li>*/}
                            {/*    <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">*/}
                            {/*        <div className="flex items-baseline">*/}
                            {/*            <span className="inline-flex">*/}
                            {/*                <span>*/}
                            {/*                    Illuminate*/}
                            {/*                    <span className="mx-0.5">\</span>*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    Database*/}
                            {/*                    <span className="mx-0.5">\</span>*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    Connection*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*            </span>*/}
                            {/*            <span className="px-1 font-mono text-xs">:346</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="font-semibold">runQueryCallback</div>*/}
                            {/*    </li>*/}
                            {/*    <li*/}
                            {/*        className="*/}
                            {/*      group*/}
                            {/*          px-6 sm:px-10*/}
                            {/*          py-4*/}
                            {/*          flex*/}
                            {/*          lg:justify-start*/}
                            {/*          border-b ~border-gray-200*/}
                            {/*          hover:~bg-red-500/10*/}
                            {/*      "*/}
                            {/*    >*/}
                            {/*        <button className="flex items-center">*/}
                            {/*            10 vendor frames*/}
                            {/*            <i className="ml-2 fas fa-angle-down ~text-gray-500 group-hover:text-red-500" />*/}
                            {/*        </button>*/}
                            {/*    </li>*/}
                            {/*    <li*/}
                            {/*        className="*/}
                            {/*      px-6 sm:px-10*/}
                            {/*          py-4*/}
                            {/*          border-b ~border-gray-200*/}
                            {/*          flex*/}
                            {/*          lg:justify-start*/}
                            {/*      "*/}
                            {/*    >*/}
                            {/*        <span className="~text-gray-500">1 unknown frame</span>*/}
                            {/*    </li>*/}
                            {/*    <li*/}
                            {/*        className="*/}
                            {/*      group*/}
                            {/*      px-6 sm:px-10*/}
                            {/*          py-4*/}
                            {/*          flex*/}
                            {/*          lg:justify-start*/}
                            {/*          border-b ~border-gray-200*/}
                            {/*          hover:~bg-red-500/10*/}
                            {/*      "*/}
                            {/*    >*/}
                            {/*        <button className="flex items-center">*/}
                            {/*            10 vendor frames*/}
                            {/*            <i className="ml-2 fas fa-angle-down ~text-gray-500 group-hover:text-red-500" />*/}
                            {/*        </button>*/}
                            {/*    </li>*/}
                            {/*    <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">*/}
                            {/*        <div className="flex items-baseline">*/}
                            {/*            <span className="inline-flex">*/}
                            {/*                <span>*/}
                            {/*                    index*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    .php*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*            </span>*/}
                            {/*            <span className="px-1 font-mono text-xs">:3</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="font-semibold">bootstrap</div>*/}
                            {/*    </li>*/}
                            {/*    <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">*/}
                            {/*        <div className="flex items-baseline">*/}
                            {/*            <span className="inline-flex">*/}
                            {/*                <span>*/}
                            {/*                    index*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    .php*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*            </span>*/}
                            {/*            <span className="px-1 font-mono text-xs">:3</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="font-semibold">bootstrap</div>*/}
                            {/*    </li>*/}
                            {/*    <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">*/}
                            {/*        <div className="flex items-baseline">*/}
                            {/*            <span className="inline-flex">*/}
                            {/*                <span>*/}
                            {/*                    index*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    .php*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*            </span>*/}
                            {/*            <span className="px-1 font-mono text-xs">:3</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="font-semibold">bootstrap</div>*/}
                            {/*    </li>*/}
                            {/*    <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">*/}
                            {/*        <div className="flex items-baseline">*/}
                            {/*            <span className="inline-flex">*/}
                            {/*                <span>*/}
                            {/*                    index*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    .php*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*            </span>*/}
                            {/*            <span className="px-1 font-mono text-xs">:3</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="font-semibold">bootstrap</div>*/}
                            {/*    </li>*/}
                            {/*    <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">*/}
                            {/*        <div className="flex items-baseline">*/}
                            {/*            <span className="inline-flex">*/}
                            {/*                <span>*/}
                            {/*                    index*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    .php*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*            </span>*/}
                            {/*            <span className="px-1 font-mono text-xs">:3</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="font-semibold">bootstrap</div>*/}
                            {/*    </li>*/}
                            {/*    <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">*/}
                            {/*        <div className="flex items-baseline">*/}
                            {/*            <span className="inline-flex">*/}
                            {/*                <span>*/}
                            {/*                    index*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    .php*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*            </span>*/}
                            {/*            <span className="px-1 font-mono text-xs">:3</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="font-semibold">bootstrap</div>*/}
                            {/*    </li>*/}
                            {/*    <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">*/}
                            {/*        <div className="flex items-baseline">*/}
                            {/*            <span className="inline-flex">*/}
                            {/*                <span>*/}
                            {/*                    index*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    .php*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*            </span>*/}
                            {/*            <span className="px-1 font-mono text-xs">:3</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="font-semibold">bootstrap</div>*/}
                            {/*    </li>*/}
                            {/*    <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">*/}
                            {/*        <div className="flex items-baseline">*/}
                            {/*            <span className="inline-flex">*/}
                            {/*                <span>*/}
                            {/*                    index*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    .php*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*            </span>*/}
                            {/*            <span className="px-1 font-mono text-xs">:3</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="font-semibold">bootstrap</div>*/}
                            {/*    </li>*/}
                            {/*    <li className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">*/}
                            {/*        <div className="flex items-baseline">*/}
                            {/*            <span className="inline-flex">*/}
                            {/*                <span>*/}
                            {/*                    index*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*                <span>*/}
                            {/*                    .php*/}
                            {/*                    <wbr />*/}
                            {/*                </span>*/}
                            {/*            </span>*/}
                            {/*            <span className="px-1 font-mono text-xs">:3</span>*/}
                            {/*        </div>*/}
                            {/*        <div className="font-semibold">bootstrap</div>*/}
                            {/*    </li>*/}
                            {/*</ol>*/}
                        </div>
                    </div>
                </aside>
                <section
                    className="lg:max-h-[calc(100vh-10rem)]
              2xl:max-h-[calc(100vh-7.5rem)] flex flex-col lg:col-span-4 border-t lg:border-t-0 ~border-gray-200"
                >
                    <header className="~text-gray-500 flex-none z-30 h-16 px-6 sm:px-10 flex items-center justify-end">
                        <a href="#" className="group flex items-center text-sm">
                            <span>
                                …<span className="px-0.5">/</span>
                            </span>
                            <span className="group-hover:underline">
                                Illuminate
                                <span className="px-0.5">/</span>
                            </span>
                            <span className="group-hover:underline">
                                Database
                                <span className="px-0.5">/</span>
                            </span>
                            <span className="group-hover:underline font-semibold">Connection</span>
                            <span>.php</span>
                        </a>
                    </header>

                    <FrameCodeSnippet frame={selectedFrame} />
                </section>
            </div>
        </section>
    );
}

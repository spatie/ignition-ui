import React, { useContext, useEffect, useLayoutEffect, useMemo, useReducer, useState } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import FrameCodeSnippet from './FrameCodeSnippet';
import useKeyboardShortcut from '../../../hooks/useKeyboardShortcut';
import stackReducer from '../reducer';
import allVendorFramesAreExpanded from '../selectors/allVendorFramesAreExpanded';
import getFrameGroups from '../selectors/getFrameGroups';
import getSelectedFrame from '../selectors/getSelectedFrame';
import FrameGroup from './FrameGroup';
import EditorLink from '../../ui/EditorLink';
import findIndex from 'lodash/findIndex';
import { getFrameType } from '../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

type Props = {
    openFrameIndex?: number;
};

export default function StackTrace({ openFrameIndex }: Props) {
    const { frames } = useContext(ErrorOccurrenceContext);

    const initialState = useMemo(() => {
        let selectedFrame = 0;

        const firstAppFrameIndex = findIndex(frames, (frame) => getFrameType(frame) === 'application');
        if (firstAppFrameIndex !== -1) {
            selectedFrame = frames.length - firstAppFrameIndex;
        }

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
        <section className="grid 2xl:row-span-3 2xl:row-start-1 2xl:col-start-2">
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
                                <button
                                    className="group inline-flex gap-2 items-center h-6 px-2 rounded-sm ~bg-white shadow text-xs font-medium whitespace-nowrap
                                    transform
                                    transition-animation
                                    hover:shadow-md
                                    active:shadow-inner
                                    active:translate-y-px"
                                    onClick={() =>  dispatch({ type: vendorFramesExpanded ? 'COLLAPSE_ALL_VENDOR_FRAMES' : 'EXPAND_ALL_VENDOR_FRAMES'})}
                                >
                                    <div className={`flex ${vendorFramesExpanded ? 'flex-col-reverse' :'flex-col'}`}>
                                        <FontAwesomeIcon icon={faAngleUp} className="-my-px text-[8px] ~text-gray-500 group-hover:text-indigo-500" />
                                        <FontAwesomeIcon icon={faAngleDown} className="-my-px text-[8px] ~text-gray-500 group-hover:text-indigo-500" />
                                    </div>
                                    {vendorFramesExpanded ? 'Collapse vendor frames' : ' Expand vendor frames'}
                                </button>
                            
                        </header>
                        <div id="frames" className="flex-grow overflow-auto scrollbar-hidden-y mask-fade-frames">
                            <ol className="text-sm pb-16">
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
                            </ol>
                        </div>
                    </div>
                </aside>
                <section
                    className="lg:max-h-[calc(100vh-10rem)]
              2xl:max-h-[calc(100vh-7.5rem)] flex flex-col lg:col-span-4 border-t lg:border-t-0 ~border-gray-200"
                >
                    <header className="~text-gray-500 flex-none z-30 h-16 px-6 sm:px-10 flex items-center justify-end">
                        <EditorLink
                            path={selectedFrame?.relative_file}
                            lineNumber={selectedFrame?.line_number}
                            className="flex items-center text-sm"
                        />
                    </header>

                    <FrameCodeSnippet frame={selectedFrame} />
                </section>
            </div>
        </section>
    );
}

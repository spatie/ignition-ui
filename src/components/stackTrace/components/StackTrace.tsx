import React, { useContext, useMemo, useReducer } from 'react';
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
import SmallButton from 'components/ui/SmallButton';

type Props = {
    openFrameIndex?: number;
};

export default function StackTrace({ openFrameIndex }: Props) {
    const { frames } = useContext(ErrorOccurrenceContext);

    const initialState = useMemo(() => {
        let selectedFrame = 1;

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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[33.33%,66.66%] lg:grid-rows-[57rem] items-stretch bg-white dark:shadow-none dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 overflow-hidden">
            <aside className="z-30 flex flex-col border-r ~border-gray-200">
                <div className="max-h-[33vh] lg:max-h-[none] lg:absolute inset-0 flex flex-col overflow-hidden ~bg-white">
                    <header className="flex-none px-6 sm:px-10 h-16 flex items-center justify-start ~bg-white border-b ~border-gray-200">
                        <SmallButton
                            onClick={() =>
                                dispatch({
                                    type: vendorFramesExpanded
                                        ? 'COLLAPSE_ALL_VENDOR_FRAMES'
                                        : 'EXPAND_ALL_VENDOR_FRAMES',
                                })
                            }
                        >
                            <div className={`flex ${vendorFramesExpanded ? 'flex-col-reverse' : 'flex-col'}`}>
                                <FontAwesomeIcon
                                    icon={faAngleUp}
                                    className="-my-px text-[8px] ~text-gray-500 group-hover:text-indigo-500"
                                />
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className="-my-px text-[8px] ~text-gray-500 group-hover:text-indigo-500"
                                />
                            </div>
                            {vendorFramesExpanded ? 'Collapse vendor frames' : ' Expand vendor frames'}
                        </SmallButton>
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
                                    }}
                                />
                            ))}
                        </ol>
                    </div>
                </div>
            </aside>
            <section className="flex flex-col border-t lg:border-t-0 ~border-gray-200">
                {selectedFrame && (
                    <>
                        <header className="~text-gray-500 flex-none z-30 h-16 px-6 sm:px-10 flex items-center justify-end">
                            <EditorLink
                                path={selectedFrame.file}
                                lineNumber={selectedFrame.line_number}
                                className="flex items-center text-sm"
                            />
                        </header>

                        <FrameCodeSnippet frame={selectedFrame} />
                    </>
                )}
            </section>
        </div>
    );
}

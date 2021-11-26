import React from 'react'
import {StackFrameGroupType} from "../../../types";
import RelaxedPath from "../../ui/RelaxedPath";

type Props = {
    frameGroup: StackFrameGroupType;
    onExpand: () => void;
    onSelect: (frameNumber: number) => void;
};

export default function FrameGroup({frameGroup, onExpand, onSelect}: Props) {
    return (
        <>
            {frameGroup.frames.map(frame => (
                <li key={frame.frame_number} className="px-6 sm:px-10 py-4 border-b ~border-gray-200 hover:~bg-red-500/10">
                    <div className="flex items-baseline">
                        <span className="inline-flex">
                            <RelaxedPath path={frame.class || ''} divider="\" />
                        </span>
                        <span className="px-1 font-mono text-xs">:{frame.line_number}</span>
                    </div>
                    <div className="font-semibold">{frame.method}</div>
                </li>
            ))}
        </>
    )
}

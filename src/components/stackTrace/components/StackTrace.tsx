import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import StackTraceExplorer from "./StackTraceExplorer";

type Props = {
    openFrameIndex?: number;
};

export default function StackTrace({ openFrameIndex }: Props) {
    const { frames } = useContext(ErrorOccurrenceContext);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[33.33%,66.66%] lg:grid-rows-[57rem] items-stretch bg-white dark:shadow-none dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 overflow-hidden">
            <StackTraceExplorer frames={frames} openFrameIndex={openFrameIndex} />
        </div>
    );
}

import React, {useContext, useState} from 'react';
import {getContextValues} from "../../util";
import ErrorOccurrenceContext from "../../contexts/ErrorOccurrenceContext";
import {map, sortBy} from 'lodash';
import {DebugEventType} from "../../types";

export default function Debug() {
    const [visibleTypesMap, setVisibleTypesMap] = useState({
        dump: true,
        glow: true,
        log: true,
        query: true,
    });

    const visibleTypes = Object.entries(visibleTypesMap)
        .filter(([_type, visible]) => visible)
        .map(([type]) => type);

    function toggleVisibleType(type: 'dump' | 'glow' | 'log' | 'query') {
        setVisibleTypesMap({...visibleTypesMap, [type]: !visibleTypesMap[type]});
    }

    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const events: Array<DebugEventType> = sortBy(
        [
            ...map(getContextValues(errorOccurrence, 'dumps'), createDumpEvent),
            ...map(errorOccurrence.glows, createGlowEvent),
            ...map(getContextValues(errorOccurrence, 'logs'), createLogEvent),
            ...map(getContextValues(errorOccurrence, 'queries'), createQueryEvent),
        ],
        'microtime',
    ).filter((event) => visibleTypes.includes(event.type));

    return (
        <section className="mt-20 2xl:col-start-2">
            <a id="debug" className="z-50 absolute top-[-7.5rem]"/>
            <div className="bg-gray-300/70 dark:bg-black/20 shadow-inner">
                <nav className="flex justify-center items-center">
                    <ul className="-mt-5 flex justify-start items-center rounded-full shadow-lg bg-indigo-400 text-white space-x-px">
                        <li className={`${visibleTypesMap.dump ? 'bg-indigo-500' : '~bg-white text-gray-500'} rounded-l-full`}>
                            <button
                                onClick={() => toggleVisibleType('dump')}
                                className="group flex items-center px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium "
                            >
                                <span
                                    className="mr-1.5 inline-flex items-center justify-center px-1 min-w-[1rem] h-4 bg-gray-900/30 text-white rounded-full text-xs"
                                >
                                    {events.filter(e => e.type === 'dump').length}
                                </span>
                                <span>Dumps</span>
                            </button>
                        </li>
                        <li className={visibleTypesMap.glow ? 'bg-indigo-500' : '~bg-white text-gray-500'}>
                            <button
                                onClick={() => toggleVisibleType('glow')}
                                className="group flex items-center px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium"
                            >
                                <span
                                    className="mr-1.5 inline-flex items-center justify-center px-1 min-w-[1rem] h-4 bg-gray-900/50 text-white rounded-full text-xs"
                                >
                                    {events.filter(e => e.type === 'glow').length}
                                </span>
                                Glows
                            </button>
                        </li>
                        <li className={visibleTypesMap.query ? 'bg-indigo-500' : '~bg-white text-gray-500'}>
                            <button
                                onClick={() => toggleVisibleType('query')}
                                className="group flex items-center px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium"
                            >
                                <span
                                    className="mr-1.5 inline-flex items-center justify-center px-1 min-w-[1rem] h-4 bg-gray-900/50 text-white rounded-full text-xs"
                                >
                                    {events.filter(e => e.type === 'query').length}
                                </span>
                                Queries
                            </button>
                        </li>
                        <li className={`${visibleTypesMap.log ? 'bg-indigo-500' : '~bg-white text-gray-500'} rounded-r-full`}>
                            <button
                                onClick={() => toggleVisibleType('log')}
                                className="group flex items-center px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium"
                            >
                                <span
                                    className="mr-1.5 inline-flex items-center justify-center px-1 min-w-[1rem] h-4 bg-gray-900/50 text-white rounded-full text-xs"
                                >
                                    {events.filter(e => e.type === 'log').length}
                                </span>
                                Logs
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="py-8 px-6 sm:px-10">
                    {/* <span class="text-gray-500">No debug information.</span> */}
                    <dl className="grid grid-cols-[8rem,minmax(0,1fr)] lg:gap-x-10 gap-y-2">
                        <dt className="py-2 truncate">Debug Data</dt>
                        <dd className="group overflow-hidden ~bg-gray-200/50">
                            <div className="px-4 py-2 mask-fade-x">
                                <code className="font-mono leading-relaxed text-sm font-normal">
                                    <pre>…</pre>
                                </code>
                            </div>
                            <button
                                className="absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                            >
                                <i className="far fa-copy"/>
                            </button>
                        </dd>
                        <dt className="py-2 truncate">More Data</dt>
                        <dd className="group overflow-hidden ~bg-gray-200/50">
                            <div className="px-4 py-2 mask-fade-x">
                                <code className="font-mono leading-relaxed text-sm font-normal">
                                    <pre>…</pre>
                                </code>
                            </div>
                            <button
                                className="absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                            >
                                <i className="far fa-copy"/>
                            </button>
                        </dd>
                        <dt className="py-2 truncate">Data</dt>
                        <dd className="group ~bg-gray-200/50">
                            <div className="max-h-64 overflow-hidden mask-fade-y">
                                <div className="px-4 py-2 mask-fade-x">
                                    <code className="font-mono leading-relaxed text-sm font-normal">
                                        <pre>
                                            curl "https://medialibrary.pro/demo-customized-collection" \{'\n'}
                                            {'    '}-X POST \{'\n'}
                                            {'    '}-H 'cookie:
                                            XSRF-TOKEN=eyJpdiI6IjM1cTRDMzlBUmx2OUw4UXd1MUtoaGc9PSIsInZhbHVlIjoiSGhPejVGTnlTbEY0UFlJYThHUHBKOERoVmU4MDFpUVV4aWdsOW16SnFvUEVvMmZXdlpMci9Sc3hTeDJkSldnTW9xc2IwSWEvWnJLeVpsQWNzVTBROG1rQXkzaExQaU5XWWROeWZYcHJBZkFFM092SXZOd0c0NzZYdEFoUXNZUUYiLCJtYWMiOiIxNzU0ZjViMDljMmEzZTM1YjljYWY2NDk5ZjcwM2UyNzI0MWZkYThkNmZiMmZkNmVlZDZmZmMyNGQ2YWJlYzY2In0%3D;
                                            medialibrarypro_session=eyJpdiI6IjlkVUNHQlVQZHc4cUVxa05SN200dEE9PSIsInZhbHVlIjoibXZaMzdjVzk4OXcvQjZTL2V1dVRJbHZuU3p5VmFYbFBUTWVoSVRtYnZ6bDRVS1lmd2QwenVLTERreGh6d2FZZDdmTnl5MU1nR3d3cnNMLzBiL0FtRXVHQ2NYTkdabVB0bXNoc2F4dkZOcUpjRkFUWUZKTDV4ckwwZ04wZmQwTHoiLCJtYWMiOiI0MjA1NzEzOWFjMDhlMWE3MTgwZDdmMmRiYmEzOTQ3MGEwODQ3OWIxYjYyMjRmYTdmOTNmOGU3ZGI5ODY0M2I1In0%3D'
                                            \{'\n'}
                                            {'    '}-H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8,bn;q=0.7,fr;q=0.6' \
                                            {'\n'}
                                            {'    '}-H 'accept-encoding: gzip, deflate, br' \{'\n'}
                                            {'    '}-H 'referer: https://medialibrary.pro/demo-customized-collection' \
                                            {'\n'}
                                            {'    '}-H 'sec-fetch-dest: document' \{'\n'}
                                            {'    '}-H 'sec-fetch-user: ?1' \{'\n'}
                                            {'    '}-H 'sec-fetch-mode: navigate' \{'\n'}
                                            {'    '}-H 'sec-fetch-site: same-origin' \{'\n'}
                                            {'    '}-H 'accept:
                                            text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
                                            \{'\n'}
                                            {'    '}-H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
                                            AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36' \
                                            {'\n'}
                                            {'    '}-H 'content-type: application/x-www-form-urlencoded' \{'\n'}
                                            {'    '}-H 'origin: https://medialibrary.pro' \{'\n'}
                                            {'    '}-H 'upgrade-insecure-requests: 1' \{'\n'}
                                            {'    '}-H 'sec-ch-ua-platform: "Windows"' \{'\n'}
                                            {'    '}-H 'sec-ch-ua-mobile: ?0' \{'\n'}
                                            {'    '}-H 'sec-ch-ua: "Chromium";v="94", "Google Chrome";v="94", ";Not A
                                            Brand";v="99"' \{'\n'}
                                            {'    '}-H 'cache-control: max-age=0' \{'\n'}
                                            {'    '}-H 'content-length: 1394' \{'\n'}
                                            {'    '}-H 'host: medialibrary.pro' \{'\n'}
                                            {'    '}-F '_token=7uzRjLOwiqLEgOvXpKKDXyl70FHlHtblkjY0vkDk' -F
                                            'downloads=[object Object]'
                                        </pre>
                                    </code>
                                </div>
                            </div>
                            <button
                                className="absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                            >
                                <i className="far fa-copy"/>
                            </button>
                            <button
                                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 shadow-md ~bg-white ~text-gray-500 hover:text-indigo-500 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-xs "
                            >
                                <i className="fas fa-angle-down"/>
                            </button>
                        </dd>
                    </dl>
                </div>
            </div>
        </section>
    );
}

function createQueryEvent({microtime, sql, time, connection_name, bindings, replace_bindings}: any): DebugEventType {
    return {
        microtime,
        type: 'query',
        label: sql,
        metadata: {time, connection_name},
        context: bindings || {},
        replace_bindings: replace_bindings,
    };
}

function createDumpEvent({microtime, html_dump, file, line_number}: any): DebugEventType {
    return {
        microtime,
        type: 'dump',
        label: html_dump,
        metadata: {file, line_number},
        context: {},
    };
}

function createLogEvent({microtime, context, level, message}: any): DebugEventType {
    return {
        microtime,
        type: 'log',
        label: message,
        metadata: {level},
        context,
    };
}

function createGlowEvent({microtime, message_level, meta_data, time, name}: any): DebugEventType {
    return {
        type: 'glow',
        label: name,
        microtime,
        metadata: {time, message_level},
        context: meta_data || {},
    };
}

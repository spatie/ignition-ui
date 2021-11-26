import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../contexts/ErrorOccurrenceContext';

export default function ErrorMessage() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    return (
        <>
            <h1 className="my-4 font-semibold leading-snug text-xl">{errorOccurrence.exception_message}</h1>

            {/* TODO: parse exception message for queries, etc */}
            <div className="mt-4 group ~bg-gray-500/5">
                <div className="max-h-32 overflow-hidden mask-fade-y">
                    <div className="px-4 py-2 mask-fade-x">
                        <code className="font-mono leading-relaxed text-sm font-normal">
                            <pre>
                                SQL: select * from `users` where `uuid` ={'\n'}47a4af2e-5156-4277-86a0-b55e773f6d1e
                                limit 1{'\n'}SQL: select * from `users` where `uuid` ={'\n'}
                                47a4af2e-5156-4277-86a0-b55e773f6d1e limit 1
                            </pre>
                        </code>
                    </div>
                </div>
                <button className="absolute top-2 right-2 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <i className="far fa-copy" />
                </button>
                <button className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 shadow-md ~bg-white ~text-gray-500 hover:text-indigo-500 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-xs ">
                    <i className="fas fa-angle-down" />
                </button>
            </div>
        </>
    );
}

import React, { useContext } from 'react';
import FormattedExceptionMessage from '../ui/FormattedExceptionMessage';
import ErrorOccurrenceContext from '../../contexts/ErrorOccurrenceContext';
import RelaxedFullyQualifiedClassName from '../ui/RelaxedFullyQualifiedClassName';
import Solutions from './Solutions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faLaravel } from '@fortawesome/free-brands-svg-icons';

export default function ErrorCard() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const hasSolutions = errorOccurrence.solutions.length > 0;

    return (
        <section className="grid grid-cols-1 lg:flex items-stretch ~bg-white shadow-lg">
            <main id="exception" className="z-10 flex-grow">
                <div className="overflow-hidden">
                    <div className="px-6 sm:px-10 py-8 overflow-x-auto">
                        <header className="flex items-center justify-between">
                            <button className="group h-10 px-4 items-center flex gap-3 rounded-sm ~bg-gray-500/5">
                                <p className="flex flex-wrap leading-tight">
                                    <RelaxedFullyQualifiedClassName path={errorOccurrence.exception_class} />
                                </p>
                                <FontAwesomeIcon icon={faAngleDown} className="group-hover:text-indigo-500 text-sm" />
                            </button>

                            <div className="grid grid-flow-col justify-end gap-4 text-sm ~text-gray-500">
                                <span>
                                    <span className="tracking-wider">PHP</span>&nbsp;
                                    {errorOccurrence.language_version}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <FontAwesomeIcon icon={faLaravel} />
                                    {errorOccurrence.framework_version}
                                </span>
                            </div>
                        </header>

                        <FormattedExceptionMessage
                            exceptionClass={errorOccurrence.exception_class}
                            message={errorOccurrence.exception_message}
                        />

                        {/*<div className="grid grid-cols-1 gap-x-10 gap-y-2 text-sm">*/}
                        {/*    <span className="flex flex-wrap leading-tight">*/}
                        {/*        <span>https:</span>*/}
                        {/*        <span className="mx-0.5">//</span>*/}
                        {/*        <a href="" className="hover:underline">webapp.test</a>*/}
                        {/*        <span className="mx-0.5">/</span>*/}
                        {/*        <a className="hover:underline" href="">admin</a>*/}
                        {/*        <span className="mx-0.5">/</span>*/}
                        {/*        <a className="hover:underline" href="">products</a>*/}
                        {/*        <span className="mx-0.5">/</span>*/}
                        {/*        <a className="hover:underline" href="">details</a>*/}
                        {/*    </span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </main>

            {hasSolutions && <Solutions />}
        </section>
    );
}

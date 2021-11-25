import React, { useContext } from 'react';
import ErrorMessage from 'components/ui/ErrorMessage';
import ErrorOccurrenceContext from 'components/contexts/ErrorOccurrenceContext';
import RelaxedPath from 'components/ui/RelaxedPath';
import Solutions from './Solutions';

export default function ErrorCard() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const hasSolutions = errorOccurrence.solutions.length > 0;

    return (
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-5 2xl:grid-cols-1 items-stretch ~bg-white shadow-lg">
            <main id="exception" className={`z-10 ${hasSolutions ? 'lg:col-span-3 2xl:col-span-1' : 'col-span-full'}`}>
                <div className="overflow-hidden">
                    <div className="px-6 sm:px-10 py-8 overflow-x-auto">
                        <header className="flex items-center justify-between">
                            <nav className="group h-10 px-4 items-center flex rounded-sm ~bg-gray-500/5">
                                <p className="flex flex-wrap leading-tight">
                                    <RelaxedPath path={errorOccurrence.exception_class} divider="\" />
                                </p>
                                <button>
                                    <i className="ml-3 fas fa-angle-down group-hover:text-red-500 text-sm" />
                                </button>
                            </nav>
                            <div className="grid grid-flow-col justify-end gap-4 text-sm ~text-gray-500">
                                <span>
                                    <span className="tracking-wider">PHP</span> {errorOccurrence.language_version}
                                </span>
                                <span>
                                    <i className="fab fa-laravel" /> {errorOccurrence.framework_version}
                                </span>
                            </div>
                        </header>

                        <ErrorMessage />

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

            <Solutions />
        </section>
    );
}

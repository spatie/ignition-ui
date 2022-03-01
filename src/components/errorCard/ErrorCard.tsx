import React, {useContext} from 'react';
import FormattedExceptionMessage from '../ui/FormattedExceptionMessage';
import ErrorOccurrenceContext from '../../contexts/ErrorOccurrenceContext';
import Solutions from './Solutions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLaravel} from '@fortawesome/free-brands-svg-icons';
import {faCodeBranch} from '@fortawesome/free-solid-svg-icons';
import ExceptionSelector from './ExceptionSelector';
import ErrorBoundary from "../ui/ErrorBoundary";

export default function ErrorCard() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const hasSolutions = errorOccurrence.solutions.length > 0;

    const isLaravelError = errorOccurrence.context_items.env?.find((env) => env.name === 'laravel_version');

    return (
        <ErrorBoundary>
            <section className="lg:flex items-stretch ~bg-white shadow-lg">
                <main id="exception" className="z-10 flex-grow min-w-0">
                    <div className="overflow-hidden">
                        <div className="px-6 sm:px-10 py-8 overflow-x-auto">
                            <header className="flex items-center justify-between gap-2">
                                <ExceptionSelector/>

                                <div className="grid grid-flow-col justify-end gap-4 text-sm ~text-gray-500">
                                    <span>
                                        <span className="tracking-wider">PHP</span>
                                        &nbsp;
                                        {errorOccurrence.language_version}
                                    </span>
                                    {errorOccurrence.framework_version && (
                                        <span className="inline-flex items-center gap-1">
                                            <FontAwesomeIcon icon={isLaravelError ? faLaravel : faCodeBranch}/>
                                            {errorOccurrence.framework_version}
                                        </span>
                                    )}
                                </div>
                            </header>

                            <FormattedExceptionMessage
                                exceptionClass={errorOccurrence.exception_class}
                                message={errorOccurrence.exception_message}
                            />
                        </div>
                    </div>
                </main>

                {hasSolutions && <Solutions/>}
            </section>
        </ErrorBoundary>
    );
}

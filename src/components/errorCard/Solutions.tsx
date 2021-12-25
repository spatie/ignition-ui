import React, { useContext, useEffect, useState } from 'react';
import ErrorOccurrenceContext from '../../contexts/ErrorOccurrenceContext';
import Solution from './Solution';

export default function Solutions() {
    const { solutions } = useContext(ErrorOccurrenceContext);
    const [canExecuteSolutions, setCanExecuteSolutions] = useState(false);

    useEffect(() => {
        try {
            (async () => {
                if (!solutions[0]?.execute_endpoint) {
                    return;
                }

                const healthCheck = await (
                    await fetch(solutions[0].execute_endpoint.replace('execute-solution', 'health-check'))
                ).json();

                setCanExecuteSolutions(healthCheck.can_execute_commands); // TODO: rename to can_execute_solutions (in laravel-ignition as well)
            })();
        } catch (error) {
            setCanExecuteSolutions(false);
        }
    }, []);

    return (
        <aside id="solution" className="flex flex-col w-full lg:col-span-2 2xl:col-span-1">
            <div className="flex-grow px-6 sm:px-10 py-8 text-gray-800  bg-emerald-300">
                <button className="absolute top-4 right-4 leading-none opacity-50 hover:opacity-75 text-sm">
                    <i className="fas fa-times" />
                </button>

                {solutions.map((solution, index) => (
                    <div key={index}>
                        <Solution solution={solution} canExecute={canExecuteSolutions} isOpen={index === 0} />

                        {index !== solutions.length - 1 && <hr className="my-4 border-t border-gray-800/20" />}
                    </div>
                ))}
            </div>
        </aside>
    );
}

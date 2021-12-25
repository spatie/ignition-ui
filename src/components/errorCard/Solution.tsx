import React, { useState } from 'react';
import { ErrorSolution } from '../../types';
import SolutionRunner from './SolutionRunner';

type Props = {
    solution: ErrorSolution;
    isOpen?: boolean;
    canExecute: boolean;
};

export default function Solution({ solution, isOpen: initialIsOpen = false, canExecute = false }: Props) {
    const [isOpen, setIsOpen] = useState(initialIsOpen);

    return (
        <section>
            <button className="group mb-4 flex items-center justify-start" onClick={() => setIsOpen(!isOpen)}>
                <i
                    className={`-ml-6 w-6 fas group-hover:opacity-40 opacity-0 text-sm ${
                        isOpen ? 'fa-angle-down' : 'fa-angle-right'
                    }`}
                />
                <h2 className="min-w-0 truncate font-semibold leading-snug">{solution.title}</h2>
            </button>

            <div className={`${isOpen ? '' : 'hidden'}`}>
                {solution.description && <p>{solution.description}</p>}

                <div className="my-4 max-w-max flex items-stretch pl-4 pr-2 py-2 bg-gray-800/60 rounded-sm">
                    <code className="flex items-center flex-grow text-gray-100 font-mono text-sm">
                        {solution.action_description}
                    </code>

                    {solution.is_runnable && canExecute && <SolutionRunner solution={solution} />}
                </div>

                <ul className="grid grid-cols-1 gap-y-1 text-sm">
                    {Object.entries(solution.links).map(([title, link], index) => (
                        <li key={index}>
                            <a href={link} target="_blank" className="underline text-emerald-700 dark:text-emerald-800">
                                {title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

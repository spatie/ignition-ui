import React, { useState } from 'react';
import { ErrorSolution } from '../../types';
import SolutionRunner from './SolutionRunner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import SolutionDescription from './SolutionDescription';

type Props = {
    solution: ErrorSolution;
    isOpen?: boolean;
    isCollapsible?: boolean;
    canExecute: boolean;
};

export default function Solution({
    solution,
    isOpen: initialIsOpen = false,
    isCollapsible = true,
    canExecute = false,
}: Props) {
    const [isOpen, setIsOpen] = useState(initialIsOpen);

    return (
        <section>
            <header className="group mb-4">
                {isCollapsible ? (
                    <button
                        className="flex items-center justify-start"
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        <span className="w-6 -ml-6">
                            <FontAwesomeIcon
                                icon={faAngleDown}
                                className={`group-hover:opacity-50 opacity-0 text-sm transform transition ${
                                    isOpen ? '' : '-rotate-90'
                                }`}
                            />
                        </span>
                        <h2 className="min-w-0 truncate font-semibold leading-snug">{solution.title}</h2>
                    </button>
                ) : (
                    <h2 className="truncate font-semibold leading-snug">{solution.title}</h2>
                )}
            </header>

            <div className={`${isOpen ? '' : 'hidden'}`}>
                
                {(solution.is_runnable && canExecute) ?
                    <SolutionRunner  solution={solution} />
                :
                   <SolutionDescription solution={solution}/>
                }
                
            </div>
        </section>
    );
}

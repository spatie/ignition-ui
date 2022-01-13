import React from 'react';
import { ErrorSolution } from '../../types';

type Props = {
    solution: ErrorSolution;
};

export default function SolutionDescription({ solution }: Props) {
    return (
        <div className="grid grid-cols-1 gap-2">            
            {solution.description && <p>{solution.description}</p>}
            {solution.action_description && <p>{solution.action_description}</p>}

            <ul className="grid grid-cols-1 gap-1 text-sm">
                {Object.entries(solution.links).map(([title, link], index) => (
                    <li key={index}>
                        <a href={link} target="_blank" className="underline text-emerald-700 hover:text-emerald-800">
                            {title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

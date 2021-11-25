import React, { useState } from 'react';
import { ErrorSolution } from '../../types';

type Props = {
    solution: ErrorSolution;
};

export default function SolutionRunner({ solution }: Props) {
    const [isRunningSolution, setIsRunningSolution] = useState(false);
    const [wasExecutionSuccessful, setWasExecutionSuccessful] = useState<boolean | null>(null);

    async function executeSolution() {
        if (isRunningSolution) {
            return;
        }

        try {
            setIsRunningSolution(true);

            if (!solution.execute_endpoint) {
                return;
            }

            const response = await fetch(solution.execute_endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ solution: solution.class, parameters: solution.run_parameters }),
            });

            setWasExecutionSuccessful(response.status >= 200 && response.status < 300);
        } catch (error) {
            console.error(error);
            setWasExecutionSuccessful(false);
        } finally {
            setIsRunningSolution(false);
        }
    }

    function refresh(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        location.reload();
    }

    return (
        <>
            {wasExecutionSuccessful === null && (
                <button
                    className="ml-4 px-4 h-8 bg-white/20 text-white whitespace-nowrap border-b border-gray-500/25 text-xs
                        uppercase tracking-wider font-bold rounded-sm shadow-md hover:shadow-lg active:shadow-none"
                    onClick={executeSolution}
                    disabled={isRunningSolution}
                >
                    {isRunningSolution ? <span>Running...</span> : <span>{solution.run_button_text || 'Run'}</span>}
                </button>
            )}

            {wasExecutionSuccessful === true && (
                <p>
                    <strong className="font-semibold">The solution was executed successfully.</strong>
                    <a className="ml-2" href="#" onClick={refresh}>
                        Refresh now.
                    </a>
                </p>
            )}

            {wasExecutionSuccessful === false && (
                <p>
                    <strong className="font-semibold">
                        Something went wrong when executing the solution. Please try refreshing the page and try again.
                    </strong>
                    <a className="ml-2" href="#" onClick={refresh}>
                        Refresh now.
                    </a>
                </p>
            )}
        </>
    );
}

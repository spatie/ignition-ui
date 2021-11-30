import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../contexts/ErrorOccurrenceContext';
import CodeSnippet from "./CodeSnippet";

export default function ErrorMessage() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const sqlQuery = `SELECT
    projects.team_id
FROM
    \`flare\`.\`projects\`
    JOIN subscriptions ON subscriptions.team_id = projects.team_id
WHERE (\`last_error_received_at\` > '2021-09-29 00:00:00')
    AND(\`last_error_received_at\` < '2021-10-01')
    AND subscriptions.stripe_status IS NOT NULL
GROUP BY
    projects.team_id;`;

    return (
        <>
            <h1 className="my-4 font-semibold leading-snug text-xl">{errorOccurrence.exception_message}</h1>
            <CodeSnippet value={sqlQuery} />
        </>
    );
}

import React from 'react';

export default function ErrorBoundarySection() {
    return (
        <div className="flex flex-col gap-2 bg-red-50 dark:bg-red-500/10 px-6 py-4">
            <h2 className="font-semibold leading-snug">
                Something went wrong in Ignition!
            </h2>
            <p className="text-base">
                An error occurred in Ignition's UI. Please open an issue on{' '}
                <a href="https://github.com/spatie/ignition" className="underline">the Ignition GitHub repo</a>
                {' '}
                and make sure to include any errors or warnings in the developer console.
            </p>
        </div>
    )
}

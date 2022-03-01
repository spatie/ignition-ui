import React from 'react';
import ErrorBoundaryCard from './ErrorBoundaryCard';

type Props = {
    children: React.ReactNode;
    fallbackComponent?: (githubLink: string) => React.ReactNode;
};

type State = {
    error: null | Error;
};

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { error: error };
    }

    render() {
        const { error } = this.state;

        if (error) {
            const githubLink = `https://github.com/spatie/ignition/issues/new?title=${error.name}: ${
                error.message
            }&labels=bug&body=${'```' + error.stack + '```'}`;

            return this.props.fallbackComponent?.('') || <ErrorBoundaryCard githubLink={githubLink} />;
        }

        return this.props.children;
    }
}

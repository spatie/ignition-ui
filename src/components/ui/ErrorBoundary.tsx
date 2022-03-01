import React from 'react';
import ErrorBoundaryCard from "./ErrorBoundaryCard";

type Props = {
    children: React.ReactNode;
    fallbackComponent?: React.ReactNode;
};

type State = {
    hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        return this.state.hasError
            ? (this.props.fallbackComponent || <ErrorBoundaryCard/>)
            : this.props.children;
    }
}

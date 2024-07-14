import React, { Component, ReactNode } from 'react';

export interface ErrorBoundaryProps {
    children?: ReactNode;
    onError: (error: Error) => void;
}
interface State {
    hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        const { onError } = this.props;
        onError(error);
    }

    render(): ReactNode {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return children;
    }
}

export const AppErrorBoundary = ({ children }: { children?: ReactNode }) => {
    const onError = (error: Error) => {
        // this is a good place from which we can centralize error logging to Sentry, Bugsnag, etc.
        console.error('Something went wrong:', error);
    };
    return <ErrorBoundary onError={onError}>{children}</ErrorBoundary>;
};

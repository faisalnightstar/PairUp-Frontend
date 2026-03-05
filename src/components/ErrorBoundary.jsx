// src/components/ErrorBoundary.jsx

import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details (optional: send to Sentry or your logging service)
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-screen text-center p-4">
                    <h1 className="text-2xl font-semibold text-red-600 mb-2">
                        Oops! Something went wrong.
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Please refresh the page or try again later.
                    </p>
                    {import.meta.env.NODE_ENV === "development" &&
                        this.state.error && (
                            <details className="whitespace-pre-wrap text-left bg-gray-100 p-4 rounded-md">
                                {this.state.error.toString()}
                                <br />
                                {this.state.errorInfo?.componentStack}
                            </details>
                        )}
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Refresh
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

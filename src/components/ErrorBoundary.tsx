/* eslint-disable react/destructuring-assignment */
import React from "react";
import ErrorView from "./ErrorView";

export default class ErrorBoundary extends React.Component<
  {},
  { hasError: true; error: string } | { hasError: false; error: undefined }
> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorView
          message={this.state.error}
          onTryAgain={document.location.reload}
        />
      );
    }

    return this.props.children;
  }
}

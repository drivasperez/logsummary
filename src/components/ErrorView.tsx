import React from "react";

type ErrorViewProps = {
  message: string;
  onTryAgain(): void;
};

export default function ErrorView({ message, onTryAgain }: ErrorViewProps) {
  return (
    <section>
      <h2>Error</h2>
      <p>{message}</p>
      <p>
        <button onClick={onTryAgain} type="button">
          Try again?
        </button>
      </p>
    </section>
  );
}

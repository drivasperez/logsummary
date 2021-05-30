/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ErrorView from "./ErrorView";

describe("ErrorView", () => {
  it("Displays correct message", () => {
    const onRetry = jest.fn();
    const message = "Oh no! Oh no!";

    render(<ErrorView message={message} onTryAgain={onRetry} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("Calls callback when press button", () => {
    const onRetry = jest.fn();
    const message = "Oh no! Oh no!";

    render(<ErrorView message={message} onTryAgain={onRetry} />);

    expect(onRetry).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getByText("Try again?"));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});

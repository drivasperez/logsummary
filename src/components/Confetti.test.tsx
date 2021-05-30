/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import confetti from "canvas-confetti";

import Confetti from "./Confetti";

let mockCreated: jest.Mock | null = null;

jest.mock("canvas-confetti", () => ({
  create: jest.fn(() => {
    mockCreated = jest.fn(() => {});
    return mockCreated;
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Confetti", () => {
  it("Fires confetti when status changes to done", async () => {
    const { rerender } = render(<Confetti status="initial" />);

    expect(confetti.create).toHaveBeenCalledTimes(1);
    expect(mockCreated).toHaveBeenCalledTimes(0);

    rerender(<Confetti status="updating" />);

    expect(confetti.create).toHaveBeenCalledTimes(1);
    expect(mockCreated).toHaveBeenCalledTimes(0);

    rerender(<Confetti status="done" />);

    expect(confetti.create).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(mockCreated).toHaveBeenCalledTimes(1));
  });
});

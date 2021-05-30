/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import LogList from "./LogList";
import { LogState } from "../utils/parseLog";

describe("LogList", () => {
  it("Renders state", () => {
    const state: LogState = new Map();
    state.set("/hello", {
      ipSet: new Set(["1.2.3", "2.3.4"]),
      views: 4,
      uniqueViews: 5,
    });

    state.set("/login", {
      ipSet: new Set(["5.6.7", "7.8.9"]),
      views: 12,
      uniqueViews: 2,
    });

    render(<LogList logs={state} ordering="all" />);
    const entries = screen.getAllByTestId("log-entry");

    expect(entries).toHaveLength(2);
    expect(entries[0]).toHaveTextContent("/login");
  });

  it("Toggles order", () => {
    const state: LogState = new Map();
    state.set("/hello", {
      ipSet: new Set(["1.2.3", "2.3.4"]),
      views: 4,
      uniqueViews: 5,
    });

    state.set("/login", {
      ipSet: new Set(["5.6.7", "7.8.9"]),
      views: 12,
      uniqueViews: 2,
    });

    const { rerender } = render(<LogList logs={state} ordering="all" />);
    let entries = screen.getAllByTestId("log-entry");

    expect(entries).toHaveLength(2);
    expect(entries[0]).toHaveTextContent("/login");
    rerender(<LogList logs={state} ordering="unique" />);

    entries = screen.getAllByTestId("log-entry");
    expect(entries).toHaveLength(2);
    expect(entries[0]).toHaveTextContent("/hello");
  });
});

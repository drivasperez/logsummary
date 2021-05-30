/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import LogSummary from "./LogSummary";
import { State } from "../utils/reducer";

describe("LogSummary", () => {
  it("changes state", () => {
    const state: State = { ordering: "all", state: "done", logs: new Map() };
    const dispatch = jest.fn();
    render(<LogSummary state={state} dispatch={dispatch} />);

    const toggle = screen.getByRole("combobox");
    fireEvent.change(toggle, { target: { value: "unique" } });

    expect(dispatch).toHaveBeenLastCalledWith({
      type: "CHANGE_ORDERING",
      ordering: "unique",
    });

    const btn = screen.getByText("Try another file?");
    fireEvent.click(btn);

    expect(dispatch).toHaveBeenLastCalledWith({
      type: "RESET",
    });
  });
});

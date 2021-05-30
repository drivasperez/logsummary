/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import OrderToggle from "./OrderToggle";

describe("OrderToggle", () => {
  it("Toggles", () => {
    const onChange = jest.fn();
    render(<OrderToggle ordering="all" changeOrdering={onChange} />);

    const options = screen.getAllByRole("option");
    expect(options.length).toBe(2);
    expect(options[0]).toHaveTextContent("total views");
    expect(options[0]).toHaveValue("all");
    expect(options[1]).toHaveTextContent("unique views");
    expect(options[1]).toHaveValue("unique");

    const toggle = screen.getByRole("combobox");
    fireEvent.change(toggle, { target: { value: "unique" } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith("unique");
  });
});

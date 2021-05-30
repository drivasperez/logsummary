/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogFileForm from "./LogFileForm";

describe("LogFileForm", () => {
  it("Uploads a file", () => {
    const onSave = jest.fn();
    const file = new File(["Hello, world!"], "blah.txt");
    render(<LogFileForm onSubmit={onSave} />);

    const inputElement = screen.getByTestId("upload-input");

    expect(onSave).toHaveBeenCalledTimes(0);

    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(onSave).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByText("Submit"));
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenLastCalledWith(file);
  });
});

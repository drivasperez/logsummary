/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import IpList from "./IpList";

const ips = [
  "444.701.448.104",
  "836.973.694.403",
  "184.123.665.067",
  "382.335.626.855",
  "543.910.244.929",
  "555.576.836.194",
  "802.683.925.780",
  "200.017.277.774",
  "126.318.035.038",
  "451.106.204.921",
  "235.313.352.950",
  "217.511.476.080",
  "316.433.849.805",
  "061.945.150.735",
  "715.156.286.412",
  "646.865.545.408",
  "016.464.657.359",
  "897.280.786.156",
  "682.704.613.213",
  "722.247.931.582",
  "158.577.775.616",
  "336.284.013.698",
];

describe("IP List", () => {
  it("Displays IPs", () => {
    render(<IpList path="/about/2" ips={ips} />);
    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(ips.length);
    expect(items[0]).toHaveTextContent("444.701.448.104");
    expect(items[ips.length - 1]).toHaveTextContent("336.284.013.698");
  });
});

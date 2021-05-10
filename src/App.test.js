import { render, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

let sum = (a, b) => a + b;

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

import { render, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import AboutUs from "../components/AboutUs";

test("renders without crashing", () => {
    render(<AboutUs />);
    const div = document.createElement("div");
    ReactDOM.render(<AboutUs />, div);
});

// test('About Us must have className = "aboutUs"', () => {
//     render(<AboutUs />);
//     const main = screen.getByRole('h2');
//     expect(main).toHaveAttribute('className', 'aboutUs');
// });


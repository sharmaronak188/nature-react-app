import { render, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Main from "../components/Main";
import ReactTestUtils from "react-dom/test-utils";

test("renders without crashing", () => {
    render(<Main />);
    const div = document.createElement("div");
    ReactDOM.render(<Main />, div);
});

test('Main must have src = "assets/Nature/Sapling.png" and alt = "sapling"', () => {
    render(<Main />);
    const main = screen.getByRole('img');
    expect(main).toHaveAttribute('src', 'assets/Nature/Sapling.png');
    expect(main).toHaveAttribute('alt', 'sapling');
});

// test('Has an header tag', () => {
//     const component = ReactTestUtils.renderIntoDocument(<BrowserRouter><Main /></BrowserRouter>);
//     var p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p')
// });
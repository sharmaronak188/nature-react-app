import { render, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import Orders from "../components/Orders";

test("renders without crashing", () => {
    render(<Orders />);
    const div = document.createElement("div");
    ReactDOM.render(<Orders />, div);
});
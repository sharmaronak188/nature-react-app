import { render, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import ContactUs from "../components/ContactUs";

test("renders without crashing", () => {
    render(<ContactUs />);
    const div = document.createElement("div");
    ReactDOM.render(<ContactUs />, div);
});

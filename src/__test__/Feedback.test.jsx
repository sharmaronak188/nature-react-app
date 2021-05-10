import { render, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import Feedback from "../components/Feedback";

test("renders without crashing", () => {
    render(<Feedback />);
    const div = document.createElement("div");
    ReactDOM.render(<Feedback />, div);
});
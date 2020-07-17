import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import AirData from "./AirData";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders with or without data", () => {
    act(() => {
        render(<AirData/>, container);
    });
    expect(container.textContent).toBe("TemperatureN/A ℃Air PressureN/A hPaHumidityN/A%");

    act(() => {
        const liveData = {
            temperature: 20,
            airPressure: 1012,
            humidity: 76
        };
        render(<AirData liveData={liveData}/>, container);
    });
    expect(container.textContent).toBe("Temperature20 ℃Air Pressure1012 hPaHumidity76%");
});

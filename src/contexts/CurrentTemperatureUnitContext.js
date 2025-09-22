// src/contexts/CurrentTemperatureUnitContext.js
import { createContext } from "react";

const CurrentTemperatureUnitContext = createContext({
  currentTemperatureUnit: "F",
  handleToggleSwitchChange: () => {},
});

export default CurrentTemperatureUnitContext;

// src/components/ToggleSwitch/ToggleSwitch.jsx
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const isF = currentTemperatureUnit === "F";

  return (
    <label className="toggle" aria-label="Temperature Unit">
      <input
        type="checkbox"
        className="toggle__input"
        checked={isF}                 /* F when checked, C when unchecked */
        onChange={handleToggleSwitchChange}
        aria-checked={isF}
      />
      <span className="toggle__track">
        <span className={`toggle__pill ${isF ? "is-f" : "is-c"}`} />
        <span className="toggle__label toggle__label--f">F</span>
        <span className="toggle__label toggle__label--c">C</span>
      </span>
    </label>
  );
}

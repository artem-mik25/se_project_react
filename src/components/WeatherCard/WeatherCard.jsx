// src/components/WeatherCard/WeatherCard.jsx
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import "./WeatherCard.css";

export default function WeatherCard({
  city,
  country,
  temp,        // currently in °F (from your existing fetch)
  feelsLike,   // currently in °F
  condition,
  icon,        // e.g. "04d"
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const location = [city, country].filter(Boolean).join(", ");
  const unitLabel = `°${currentTemperatureUnit}`;

  // base (F) coming from your API usage today
  const tempF = Number.isFinite(temp) ? temp : null;
  const feelsF = Number.isFinite(feelsLike) ? feelsLike : null;

  // compute C locally when needed
  const toC = (f) => (Number.isFinite(f) ? Math.round((f - 32) * 5 / 9) : null);

  const shownTemp  = currentTemperatureUnit === "F" ? tempF  : toC(tempF);
  const shownFeels = currentTemperatureUnit === "F" ? feelsF : toC(feelsF);

  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;

  return (
    <section className="weather">
      <div className="weather__content">
        <div className="weather__temp">
          <span className="weather__temp-value">
            {Number.isFinite(shownTemp) ? shownTemp : "--"}
          </span>
          <span className="weather__temp-unit">{unitLabel}</span>
        </div>

        <div className="weather__meta">
          <div className="weather__location">{location || "—"}</div>
          <div className="weather__condition">
            {condition || "—"}
            {Number.isFinite(shownFeels) && (
              <span className="weather__feels">
                {" "}
                · feels like {shownFeels}{unitLabel}
              </span>
            )}
          </div>
        </div>
      </div>

      {iconUrl && (
        <img
          className="weather__icon"
          src={iconUrl}
          alt={condition ? `${condition} icon` : "Weather icon"}
          width="80"
          height="80"
        />
      )}
    </section>
  );
}

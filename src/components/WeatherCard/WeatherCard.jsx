// src/components/WeatherCard/WeatherCard.jsx
import "./WeatherCard.css";

export default function WeatherCard({
  city,
  country,
  temp,
  feelsLike,
  condition,
  icon,
  units,
}) {
  return (
    <section className="weather">
      <div className="weather__header">
        <h2 className="weather__city">
          {city}
          {country ? `, ${country}` : ""}
        </h2>
      </div>

      <div className="weather__body">
        {icon && (
          <img
            className="weather__icon"
            src={icon}
            alt={condition || "Weather icon"}
          />
        )}

        <div className="weather__temp">
          {temp}°{units === "metric" ? "C" : "F"}
        </div>

        <div className="weather__meta">
          <span className="weather__condition">{condition}</span>
          <span className="weather__feels">
            Feels like {feelsLike}°{units === "metric" ? "C" : "F"}
          </span>
        </div>
      </div>
    </section>
  );
}

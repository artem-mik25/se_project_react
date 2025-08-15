// src/components/WeatherCard/WeatherCard.jsx
import "./WeatherCard.css";

export default function WeatherCard({
  city,
  country,
  temp,
  feelsLike,
  condition,
  icon, // OpenWeather icon id like "04d"
}) {
  // Avoid crashing before data loads
  const location = [city, country].filter(Boolean).join(", ");
  const temperature = Number.isFinite(temp) ? temp : "--";
  const feels = Number.isFinite(feelsLike) ? feelsLike : null;

  // Sprint 10: fixed to Fahrenheit
  const unitLabel = "°F";

  const iconUrl = icon
    ? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : null;

  return (
    <section className="weather">
      <div className="weather__content">
        <div className="weather__temp">
          <span className="weather__temp-value">{temperature}</span>
          <span className="weather__temp-unit">{unitLabel}</span>
        </div>

        <div className="weather__meta">
          <div className="weather__location">{location || "—"}</div>
          <div className="weather__condition">
            {condition || "—"}
            {Number.isFinite(feels) && (
              <span className="weather__feels">
                {" "}
                · feels like {feels}
                {unitLabel}
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

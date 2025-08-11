// src/components/WeatherCard/WeatherCard.jsx
import "./WeatherCard.css";

export default function WeatherCard({ temp, location }) {
  return (
    <div className="weather-card">
      <h2 className="weather-card__temp">{temp}°F</h2>
      <p className="weather-card__location">{location}</p>
    </div>
  );
}

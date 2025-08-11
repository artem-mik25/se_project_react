// src/services/weather.js

// Load API key from .env
const API_KEY = import.meta.env.VITE_API_KEY;
if (!API_KEY) {
  throw new Error("Missing VITE_API_KEY in .env");
}

// Load optional overrides from .env
const BASE =
  import.meta.env.VITE_WEATHER_API_URL ||
  "https://api.openweathermap.org/data/2.5/weather";

const ICON_BASE =
  import.meta.env.VITE_WEATHER_API_ICON_URL ||
  "https://openweathermap.org/img/wn/";

const ICON_SIZE =
  import.meta.env.VITE_WEATHER_API_ICON_SIZE || "@2x";

const DEFAULT_UNITS =
  import.meta.env.VITE_WEATHER_API_UNITS || "metric";

// Main fetch function
export async function getWeatherByCity(
  city = "New York",
  units = DEFAULT_UNITS
) {
  const url = `${BASE}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`;
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Weather fetch failed (${res.status}): ${text || res.statusText}`
    );
  }

  const data = await res.json();

  // Return normalized object
  return {
    city: data.name,
    country: data.sys?.country || "",
    temp: Math.round(data.main?.temp),
    feelsLike: Math.round(data.main?.feels_like),
    condition: data.weather?.[0]?.main || "Unknown",
    icon: data.weather?.[0]?.icon
      ? `${ICON_BASE}${data.weather[0].icon}${ICON_SIZE}.png`
      : null,
  };
}

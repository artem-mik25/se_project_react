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

const ICON_SIZE = import.meta.env.VITE_WEATHER_API_ICON_SIZE || "@2x";

// ⚠️ You can keep this as "metric" if you want your legacy `temp` to be °C,
// or change it to "imperial" if you want legacy `temp` to be °F.
const DEFAULT_UNITS = import.meta.env.VITE_WEATHER_API_UNITS || "imperial";

/** Helper to build icon URL from id like "04d" */
export const getIconUrl = (iconId, size = ICON_SIZE) =>
  iconId ? `${ICON_BASE}${iconId}${size}.png` : null;

/** Convert safely */
const fToC = (f) => (Number.isFinite(f) ? Math.round((f - 32) * 5 / 9) : NaN);
const cToF = (c) => (Number.isFinite(c) ? Math.round(c * 9 / 5 + 32) : NaN);

/**
 * Fetch current weather by city and return a normalized object with both units.
 *
 * Legacy fields kept for compatibility:
 *   - temp, feelsLike (match the `units` you requested)
 *
 * New fields for the toggle:
 *   - temperature: { F, C }
 *   - feelsLikeBoth: { F, C }
 */
export async function getWeatherByCity(city = "New York", units = DEFAULT_UNITS) {
  const url = `${BASE}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`;
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Weather fetch failed (${res.status}): ${text || res.statusText}`);
  }

  const data = await res.json();

  // Extract base numbers from API according to requested units
  const rawTemp = Math.round(data.main?.temp);
  const rawFeels = Math.round(data.main?.feels_like);

  let F, C, feelsF, feelsC;

  if (units === "imperial") {
    F = rawTemp;
    C = fToC(rawTemp);
    feelsF = rawFeels;
    feelsC = fToC(rawFeels);
  } else {
    // metric (°C) or anything else → treat as °C
    C = rawTemp;
    F = cToF(rawTemp);
    feelsC = rawFeels;
    feelsF = cToF(rawFeels);
  }

  const iconId = data.weather?.[0]?.icon || null;

  return {
    city: data.name,
    country: data.sys?.country || "",
    // Legacy fields (match requested `units`)
    temp: units === "imperial" ? F : C,
    feelsLike: units === "imperial" ? feelsF : feelsC,
    // New fields for the F/C toggle
    temperature: { F, C },
    feelsLikeBoth: { F: feelsF, C: feelsC },
    condition: data.weather?.[0]?.main || "Unknown",
    iconId,
    icon: getIconUrl(iconId), // convenience URL (keeps old name you used)
  };
}

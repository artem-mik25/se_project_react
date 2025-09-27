// src/utils/weatherApi.js

const API_BASE = "https://api.openweathermap.org/data/2.5/weather";

/** Build the OpenWeather URL */
function buildUrl({ latitude, longitude, apiKey }) {
  const url = new URL(API_BASE);
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  // We always request in °F (imperial) so the F-based classifier stays correct.
  url.searchParams.set("units", "imperial");
  url.searchParams.set("appid", apiKey);
  return url.toString();
}

/** Convert helpers */
const fToC = (f) => (Number.isFinite(f) ? Math.round((f - 32) * 5 / 9) : NaN);

/**
 * Fetch current weather and normalize the shape.
 * Returns:
 * {
 *   city, country,
 *   // legacy fields (for existing UI):
 *   temp: number (°F),
 *   feelsLike: number (°F),
 *   // new fields (both units available to consumers):
 *   temperature: { F: number, C: number },
 *   feels: { F: number, C: number },
 *   condition: string,
 *   icon: string | null
 * }
 */
export async function fetchWeather({ latitude, longitude }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_API_KEY. Add it to your .env file.");
  }

  const res = await fetch(buildUrl({ latitude, longitude, apiKey }));
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Weather API error (${res.status}): ${text || res.statusText}`);
  }

  const data = await res.json();

  const tempF = Math.round(data?.main?.temp ?? NaN);
  const feelsF = Math.round(data?.main?.feels_like ?? NaN);
  const tempC = fToC(tempF);
  const feelsC = fToC(feelsF);

  return {
    city: data?.name ?? "Unknown",
    country: data?.sys?.country ?? "",

    // legacy fields used by existing components
    temp: tempF,
    feelsLike: feelsF,

    // new fields: both units ready to use
    temperature: { F: tempF, C: tempC },
    feels: { F: feelsF, C: feelsC },

    condition: data?.weather?.[0]?.main ?? "—",
    icon: data?.weather?.[0]?.icon ?? null,
  };
}

/** Icon URL helper */
export function iconUrl(iconId) {
  return iconId ? `https://openweathermap.org/img/wn/${iconId}@2x.png` : null;
}

/** Temperature classifier — Fahrenheit bands */
export function classifyTempF(tempF) {
  if (!Number.isFinite(tempF)) return "cold";
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
}

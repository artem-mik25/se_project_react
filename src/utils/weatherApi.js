// src/utils/weatherApi.js

const API_BASE = "https://api.openweathermap.org/data/2.5/weather";

/** Build the OpenWeather URL */
function buildUrl({ latitude, longitude, units = "imperial", apiKey }) {
  const url = new URL(API_BASE);
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("units", units); // Sprint 10: "imperial" (°F)
  url.searchParams.set("appid", apiKey);
  return url.toString();
}

/**
 * Fetch current weather and normalize the shape.
 * Returns:
 * { city, country, temp, feelsLike, condition, icon }
 */
export async function fetchWeather({ latitude, longitude, units = "imperial" }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_API_KEY. Add it to your .env file.");
  }

  const res = await fetch(buildUrl({ latitude, longitude, units, apiKey }));
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Weather API error (${res.status}): ${text || res.statusText}`);
  }

  const data = await res.json();
  return {
    city: data?.name ?? "Unknown",
    country: data?.sys?.country ?? "",
    temp: Math.round(data?.main?.temp ?? NaN),
    feelsLike: Math.round(data?.main?.feels_like ?? NaN),
    condition: data?.weather?.[0]?.main ?? "—",
    icon: data?.weather?.[0]?.icon ?? null,
  };
}

/** Optional helper: icon URL */
export function iconUrl(iconId) {
  return iconId ? `https://openweathermap.org/img/wn/${iconId}@2x.png` : null;
}

/** Sprint 10 temperature classifier — Fahrenheit bands */
export function classifyTempF(tempF) {
  if (!Number.isFinite(tempF)) return "cold";
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
}

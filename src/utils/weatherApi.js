// src/utils/weatherApi.js
import { COORDS, WEATHER_API_KEY } from "./constants";

/**
 * Fetches raw data from OpenWeatherMap for your chosen coordinates.
 * @returns {Promise<any>}
 */
export async function fetchCurrentWeather() {
  const { lat, lon } = COORDS;
  const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}` +
    `&units=imperial&appid=${WEATHER_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather fetch failed (${res.status})`);
  }
  return res.json();
}

/**
 * Parses the OpenWeatherMap response into just the fields we need.
 * @param {any} data
 * @returns {{ temp: number, location: string }}
 */
export function parseWeather(data) {
  return {
    temp: data.main.temp,
    location: data.name,
  };
}

/**
 * (Optional for later) Map a temperature to a simple weather category.
 * @param {number} temp
 * @returns {"hot"|"warm"|"cold"}
 */
export function getWeatherType(temp) {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
}

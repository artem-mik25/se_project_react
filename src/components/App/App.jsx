// src/components/App/App.jsx
import { useEffect, useState } from "react";
import { getWeatherByCity } from "../../services/weather";

import Header from "../Header/Header.jsx";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ClothingSuggestion from "../ClothingSuggestion/ClothingSuggestion.jsx";
import Footer from "../Footer/Footer.jsx";

// Outfit bands in °C
function getSuggestions(tempC) {
  if (!Number.isFinite(tempC)) return ["—"];
  if (tempC <= 5) return ["Heavy coat", "Scarf", "Gloves", "Boots"];
  if (tempC <= 15) return ["Light jacket", "Sweater", "Jeans"];
  if (tempC <= 24) return ["Long-sleeve tee", "Chinos", "Sneakers"];
  return ["T-shirt", "Shorts", "Cap", "Light shoes"];
}

export default function App() {
  const [city, setCity] = useState("New York");
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setStatus("loading");
      setError("");
      try {
        const w = await getWeatherByCity(city, units);
        if (!cancelled) {
          setWeather(w);
          setStatus("idle");
        }
      } catch (e) {
        if (!cancelled) {
          setStatus("error");
          setError(e.message || "Failed to load weather");
        }
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [city, units]);

  const tempC =
    weather &&
    (units === "metric"
      ? weather.temp
      : Math.round((weather.temp - 32) * (5 / 9)));

  const outfits = getSuggestions(Number(tempC));

  return (
    <div className="app">
      <Header
        city={city}
        onCityChange={setCity}
        units={units}
        onUnitsChange={setUnits}
      />

      <main className="main">
        {status === "loading" && <p className="status">Loading weather…</p>}

        {status === "error" && (
          <div className="status status--error">
            <p>{error}</p>
            {error.includes("VITE_API_KEY") && (
              <div className="hint">
                <p>Create a <code>.env</code> in the project root with:</p>
                <pre>VITE_API_KEY=your_openweather_key</pre>
                <p>Then restart <code>npm run dev</code>.</p>
              </div>
            )}
          </div>
        )}

        {status === "idle" && weather && (
          <>
            <WeatherCard
              city={weather.city}
              country={weather.country}
              temp={weather.temp}
              feelsLike={weather.feelsLike}
              condition={weather.condition}
              icon={weather.icon}
              units={units}
            />
            <ClothingSuggestion
              temperatureC={tempC}
              condition={weather.condition}
              outfits={outfits}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

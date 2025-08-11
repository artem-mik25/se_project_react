// src/components/ClothingSuggestion/ClothingSuggestion.jsx
import "./ClothingSuggestion.css";

export default function ClothingSuggestion({ temperatureC, condition, outfits = [] }) {
  return (
    <section className="clothes">
      <h2 className="clothes__title">What to wear</h2>
      <p className="clothes__meta">
        {Number.isFinite(temperatureC) ? `${temperatureC}°C` : "—"} • {condition || "—"}
      </p>

      {outfits.length ? (
        <ul className="clothes__list">
          {outfits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="clothes__meta">No suggestions yet.</p>
      )}
    </section>
  );
}

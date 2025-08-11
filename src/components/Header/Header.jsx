// src/components/Header/Header.jsx
import "./Header.css";

export default function Header({
  city,
  onCityChange,
  units,
  onUnitsChange,
  onAddItem, // optional: hook up to your modal later
}) {
  return (
    <header className="header">
      <div className="header__row">
        <h1 className="header__brand">wtwr°</h1>

        <div className="header__controls">
          <label className="header__field">
            <span className="visually-hidden">City</span>
            <input
              className="header__input"
              type="text"
              value={city}
              onChange={(e) => onCityChange?.(e.target.value)}
              placeholder="Enter city"
              aria-label="City"
            />
          </label>

          <div className="header__units" role="group" aria-label="Units">
            <button
              type="button"
              className={`btn btn--light ${units === "metric" ? "is-active" : ""}`}
              onClick={() => onUnitsChange?.("metric")}
            >
              °C
            </button>
            <button
              type="button"
              className={`btn btn--light ${units === "imperial" ? "is-active" : ""}`}
              onClick={() => onUnitsChange?.("imperial")}
            >
              °F
            </button>
          </div>

          <button
            type="button"
            className="header__add-btn btn btn--light"
            onClick={() => onAddItem?.()}
          >
            + Add clothes
          </button>
        </div>
      </div>
    </header>
  );
}

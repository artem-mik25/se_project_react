// src/components/App/App.jsx
import { useEffect, useMemo, useState } from "react";
import "./App.css";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

import { COORDS, defaultClothingItems } from "../../utils/constants.js";
import { fetchWeather, classifyTempF } from "../../utils/weatherApi.js";

export default function App() {
  // -------- App state (Sprint 10) --------
  const [weather, setWeather] = useState(null); // { city, country, temp, feelsLike, condition, icon, units }
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [items, setItems] = useState([]); // default clothing items
  const [showAll, setShowAll] = useState(false);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // -------- Mount-only weather fetch (Fahrenheit) --------
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        const data = await fetchWeather({
          latitude: COORDS.latitude,
          longitude: COORDS.longitude,
          units: "imperial", // Sprint 10 requirement (°F)
        });
        if (!cancelled) {
          setWeather({ ...data, units: "imperial" });
          setError("");
        }
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load weather");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    // default clothing items appear on mount
    setItems(defaultClothingItems);
    load();

    return () => {
      cancelled = true;
    };
  }, []);

  // -------- Derived: weather type used for filtering in <Main> --------
  const weatherType = useMemo(() => {
    const temperature = weather?.temp;
    return classifyTempF(Number.isFinite(temperature) ? temperature : NaN); // "hot" | "warm" | "cold"
  }, [weather]);

  // -------- Handlers --------
  const handleOpenAdd = () => setIsAddOpen(true);
  const handleCloseAdd = () => setIsAddOpen(false);

  const handleCardClick = (item) => setSelectedItem(item);
  const handleCloseItemModal = () => setSelectedItem(null);

  const handleToggleShowAll = () => setShowAll((s) => !s);

  // Like / Delete handlers (used by cards and modal)
  const handleLikeItem = (id) =>
    setItems((prev) =>
      prev.map((it) => (it._id === id ? { ...it, liked: !it.liked } : it))
    );

  const handleDeleteItem = (id) =>
    setItems((prev) => prev.filter((it) => it._id !== id));

  // Add new item
  const handleAddItem = ({ name, weather, link }) => {
    const newItem = {
      _id: Date.now(), // simple id for now
      name,
      weather,
      link,
      liked: false,
    };
    setItems((prev) => [newItem, ...prev]);
    handleCloseAdd();
  };

  return (
    <div className="app">
      <Header city={weather?.city || "Loading…"} onAddItem={handleOpenAdd} />

      {/* Status / errors */}
      {error && <div className="status status--error">{error}</div>}
      {isLoading && !weather && <div className="status">Loading weather…</div>}

      {/* Main holds WeatherCard + the garment grid; it does the filtering */}
      <Main
        weather={weather}
        weatherType={weatherType}
        items={items}
        showAll={showAll}
        onToggleShowAll={handleToggleShowAll}
        onCardClick={handleCardClick}
        onLikeItem={handleLikeItem}
        onDeleteItem={handleDeleteItem}
      />

      <Footer />

      {/* Add Garment modal */}
      {isAddOpen && (
        <ModalWithForm
          title="New Garment"
          name="add-garment"
          buttonText="Add"
          onClose={handleCloseAdd}
          onSubmit={(e) => {
            e.preventDefault();
            // Read via FormData (inputs live inside children)
            const fd = new FormData(e.target);
            handleAddItem({
              name: fd.get("name")?.trim(),
              weather: fd.get("weather"),
              link: fd.get("imageUrl")?.trim(),
            });
          }}
        >
          <label className="modal__label">
            Name
            <input
              className="modal__input"
              type="text"
              name="name"
              placeholder="e.g., Beanie"
              required
              minLength="2"
              maxLength="30"
            />
          </label>

          <fieldset className="modal__fieldset">
            <legend className="modal__legend">Weather type</legend>
            <label className="modal__radio">
              <input type="radio" name="weather" value="hot" required /> Hot
            </label>
            <label className="modal__radio">
              <input type="radio" name="weather" value="warm" /> Warm
            </label>
            <label className="modal__radio">
              <input type="radio" name="weather" value="cold" /> Cold
            </label>
          </fieldset>

          <label className="modal__label">
            Image URL
            <input
              className="modal__input"
              type="url"
              name="imageUrl"
              placeholder="https://example.com/item.png"
              required
            />
          </label>
        </ModalWithForm>
      )}

      {/* Image modal */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={handleCloseItemModal}
          onLike={() => handleLikeItem(selectedItem._id)}
          onDelete={() => {
            handleDeleteItem(selectedItem._id);
            handleCloseItemModal();
          }}
        />
      )}
    </div>
  );
}

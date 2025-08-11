// src/components/App/App.jsx
import { useEffect, useState } from "react";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

import { defaultClothingItems, getWeatherType } from "../../utils/constants";
import { fetchCurrentWeather, parseWeather } from "../../utils/weatherApi";

const STORAGE_KEY = "clothingItems";

export default function App() {
  const [weather, setWeather] = useState({ temp: 75, location: "New York" });

  // ✅ Hydrate from localStorage at start
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultClothingItems;
    } catch {
      return defaultClothingItems;
    }
  });

  const [showAll, setShowAll] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Fetch weather
  useEffect(() => {
    fetchCurrentWeather().then(parseWeather).then(setWeather).catch(console.error);
  }, []);

  const weatherType = getWeatherType(Number(weather.temp) || 0);
  const visibleItems = showAll ? items : items.filter((i) => i.weather === weatherType);

  const handleCardClick = (item) => setSelectedItem(item);
  const closeAllModals = () => {
    setIsAddOpen(false);
    setSelectedItem(null);
  };

  const handleAddItem = ({ name, weather, link }) => {
    const newItem = { _id: Date.now(), name, weather, link, liked: false };
    setItems((prev) => [newItem, ...prev]);
    setIsAddOpen(false);
  };

  const handleLikeToggle = (id) => {
    setItems((prev) =>
      prev.map((it) => (it._id === id ? { ...it, liked: !it.liked } : it))
    );
  };

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((it) => it._id !== id));
    if (selectedItem?._id === id) setSelectedItem(null);
  };

  return (
    <>
      <Header
        date={new Date().toLocaleString("default", { month: "long", day: "numeric" })}
        location={weather.location}
        onAddClothes={() => setIsAddOpen(true)}
        username="Terrence Tegegne"
        avatarUrl="https://placekitten.com/40/40"
      />

      <Main
        weather={weather}
        garments={visibleItems}
        onItemClick={handleCardClick}
        onLikeToggle={handleLikeToggle}
        onDeleteItem={handleDeleteItem}
        showAll={showAll}
        onToggleShowAll={() => setShowAll((v) => !v)}
      />

      <ModalWithForm
        isOpen={isAddOpen}
        onClose={closeAllModals}
        onAddItem={handleAddItem}
      />

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={closeAllModals}
          onLike={handleLikeToggle}
          onDelete={handleDeleteItem}
        />
      )}

      <Footer />
    </>
  );
}

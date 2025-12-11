// src/components/App/App.jsx

import { useEffect, useMemo, useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";

import { COORDS } from "../../utils/constants.js";
import { fetchWeather, classifyTempF } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";

// API
import { getItems, addItem, deleteItem, setItemLiked, signin, signup, getCurrentUser } from "../../utils/api.js";

export default function App() {
  // -------- App state --------
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Delete confirmation state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemPendingDelete, setItemPendingDelete] = useState(null);

  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // -------- Temperature unit (context) --------
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((u) => (u === "F" ? "C" : "F"));

  // -------- Weather + Items fetch --------
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);

             // Weather
        const data = await fetchWeather({
          latitude: COORDS.latitude,
          longitude: COORDS.longitude,
        });
        if (!cancelled) setWeather(data);

        // Items from json-server
        const serverItems = await getItems();
        if (!cancelled) setItems(serverItems);

        if (!cancelled) setError("");
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to fetch");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // -------- Check auth on mount --------
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    getCurrentUser()
      .then((user) => setCurrentUser(user))
      .catch((err) => {
        console.error("Failed to get current user:", err);
        localStorage.removeItem("jwt");
      });
  }, []);

  // -------- Derived weatherType (still uses °F bands) --------
const weatherType = useMemo(() => {
  const temperature = weather?.temp ?? weather?.temperature?.F;
  return classifyTempF(Number.isFinite(temperature) ? temperature : NaN);
}, [weather]);


  // -------- Handlers --------
  const handleOpenAdd = () => setIsAddOpen(true);
  const handleCloseAdd = () => setIsAddOpen(false);

  const handleToggleShowAll = () => setShowAll((s) => !s);

  const handleCardClick = (item) => setSelectedItem(item);
  const handleCloseItemModal = () => setSelectedItem(null);

  const handleLikeItem = async (id) => {
    const current = items.find((it) => it._id === id);
    if (!current) return;

    const nextLiked = !current.liked;

    // optimistic UI update
    setItems((prev) =>
      prev.map((it) => (it._id === id ? { ...it, liked: nextLiked } : it))
    );

    try {
      await setItemLiked(id, nextLiked); // persist to API
    } catch (e) {
      // rollback if API fails
      setItems((prev) =>
        prev.map((it) =>
          it._id === id ? { ...it, liked: current.liked } : it
        )
      );
      setError(e.message);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((it) => it._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleAddItem = async ({ name, imageUrl, weather }) => {
    try {
      const created = await addItem({ name, imageUrl, weather });
      setItems((prev) => [created, ...prev]);
      handleCloseAdd();
    } catch (e) {
      setError(e.message);
    }
  };

  // Auth handlers
  const handleLogin = async ({ email, password }) => {
    try {
      const { token } = await signin({ email, password });
      localStorage.setItem("jwt", token);
      const user = await getCurrentUser();
      setCurrentUser(user);
      setIsLoginOpen(false);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleRegister = async ({ name, avatar, email, password }) => {
    try {
      await signup({ name, avatar, email, password });
      // Auto-login after successful registration
      await handleLogin({ email, password });
      setIsRegisterOpen(false);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
  };

  // Confirm modal helpers
  const openConfirmDelete = (item) => {
    setItemPendingDelete(item);
    setIsConfirmOpen(true);
  };
  const closeConfirmDelete = () => {
    setIsConfirmOpen(false);
    setItemPendingDelete(null);
  };
  const confirmDelete = async () => {
    if (!itemPendingDelete) return;
    try {
      await handleDeleteItem(itemPendingDelete._id);
    } finally {
      closeConfirmDelete();
      if (selectedItem && selectedItem._id === itemPendingDelete._id) {
        setSelectedItem(null);
      }
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <BrowserRouter>
          <Routes>
            {/* Home (/) */}
            <Route
              path="/"
              element={
                <div className="app">
                  <Header
                    city={weather?.city || "Loading…"}
                    onAddItem={handleOpenAdd}
                    onLogin={() => setIsLoginOpen(true)}
                    onRegister={() => setIsRegisterOpen(true)}
                  />

                {error && <div className="status status--error">{error}</div>}
                {isLoading && !weather && <div className="status">Loading weather…</div>}

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
              </div>
            }
          />

          {/* Profile (/profile) */}
          <Route
            path="/profile"
            element={
              <div className="app">
                <Header
                  city={weather?.city || "Loading…"}
                  onAddItem={handleOpenAdd}
                  onLogin={() => setIsLoginOpen(true)}
                  onRegister={() => setIsRegisterOpen(true)}
                />
                <Profile
                  items={items}
                  onAddItem={handleOpenAdd}
                  onCardClick={handleCardClick}
                  onLikeItem={handleLikeItem}
                  onDeleteItem={handleDeleteItem}
                  onLogout={handleLogout}
                />
                <Footer />
              </div>
            }
          />

          {/* Catch-all: redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Add Item modal */}
        {isAddOpen && (
          <AddItemModal
            isOpen={isAddOpen}
            onClose={handleCloseAdd}
            onAddItem={handleAddItem}
          />
        )}

        {/* Item viewer modal */}
        {selectedItem && (
          <ItemModal
            item={selectedItem}
            onClose={handleCloseItemModal}
            onLike={(id) => handleLikeItem(id)}
            onRequestDelete={(item) => openConfirmDelete(item)}
          />
        )}

        {/* Delete confirmation modal */}
        <DeleteConfirmationModal
          isOpen={isConfirmOpen}
          itemName={itemPendingDelete?.name}
          onConfirm={confirmDelete}
          onCancel={closeConfirmDelete}
        />

        {/* Auth modals */}
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
        />

        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

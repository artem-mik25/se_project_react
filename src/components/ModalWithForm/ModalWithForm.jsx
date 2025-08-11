// src/components/ModalWithForm/ModalWithForm.jsx
import { useState } from "react";
import "./ModalWithForm.css";

export default function ModalWithForm({ isOpen, onClose, onAddItem }) {
  // local form state
  const [name, setName] = useState("");
  const [weather, setWeather] = useState("warm");
  const [link, setLink] = useState("");

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, weather, link });
    // reset & close
    setName("");
    setWeather("warm");
    setLink("");
    onClose();
  };

  if (!isOpen) return null; // don’t render anything if closed

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>✕</button>
        <h2 className="modal__title">Add New Item</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Weather Type
            <select
              value={weather}
              onChange={e => setWeather(e.target.value)}
            >
              <option value="hot">Hot</option>
              <option value="warm">Warm</option>
              <option value="cold">Cold</option>
            </select>
          </label>

          <label>
            Image URL
            <input
              type="url"
              value={link}
              onChange={e => setLink(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="modal__submit">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

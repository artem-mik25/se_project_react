// src/components/ItemModal/ItemModal.jsx
import { useEffect } from "react";
import "./ItemModal.css";

export default function ItemModal({ item, onClose, onLike, onRequestDelete }) {
  useEffect(() => {
    if (!item) return;
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [item, onClose]);

  if (!item) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="item-modal__overlay" onClick={handleOverlayClick}>
      <div className="item-modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          aria-label="Close"
          className="item-modal__close"
          onClick={onClose}
        >
          ✕
        </button>

        <img src={item.link} alt={item.name} className="item-modal__image" />

        <h3 className="item-modal__title">{item.name}</h3>
        <p className="item-modal__meta">
          Weather: <strong>{item.weather}</strong>
        </p>

        <div className="item-modal__actions">
          <button
            type="button"
            className={`item-modal__btn ${
              item.liked ? "item-modal__btn--liked" : ""
            }`}
            onClick={() => onLike?.(item._id)}
          >
            {item.liked ? "♥ Liked" : "♡ Like"}
          </button>

          <button
            type="button"
            className="item-modal__btn item-modal__btn--danger"
            onClick={() => onRequestDelete?.(item)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

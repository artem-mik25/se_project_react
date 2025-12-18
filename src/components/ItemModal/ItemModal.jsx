// src/components/ItemModal/ItemModal.jsx
import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import "./ItemModal.css";

export default function ItemModal({ item, onClose, onCardLike, onRequestDelete }) {
  const currentUser = useContext(CurrentUserContext);
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

  // Check if the current user is the owner of the item
  const isOwn = currentUser && item.owner === currentUser._id;

  // Check if the item is liked by the current user
  const isLiked = currentUser && item.likes && item.likes.some((id) => id === currentUser._id);

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

        <img src={item.imageUrl} alt={item.name} className="item-modal__image" />

        <h3 className="item-modal__title">{item.name}</h3>
        <p className="item-modal__meta">
          Weather: <strong>{item.weather}</strong>
        </p>

        <div className="item-modal__actions">
          {currentUser && (
            <button
              type="button"
              className={`item-modal__btn ${
                isLiked ? "item-modal__btn--liked" : ""
              }`}
              onClick={() => onCardLike?.({ id: item._id, isLiked })}
            >
              {isLiked ? "♥ Liked" : "♡ Like"}
            </button>
          )}

          {isOwn && (
            <button
              type="button"
              className="item-modal__btn item-modal__btn--danger"
              onClick={() => onRequestDelete?.(item)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

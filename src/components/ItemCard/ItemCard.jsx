// src/components/ItemCard/ItemCard.jsx
import { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

export default function ItemCard({ item, onClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if the item is liked by the current user
  const isLiked =
    currentUser && item.likes && item.likes.some((id) => id === currentUser._id);

  const handleLike = () => {
    if (onCardLike && currentUser) {
      onCardLike({ id: item._id, isLiked });
    }
  };

  return (
    <div className="item-card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__image"
        onClick={() => onClick(item)}
      />
      <div className="item-card__footer">
        <p className="item-card__name">{item.name}</p>
        {currentUser && (
          <button
            className={`item-card__like ${isLiked ? "item-card__like--active" : ""}`}
            aria-label="Like"
            onClick={handleLike}
          >
            {isLiked ? "❤️" : "♡"}
          </button>
        )}
      </div>
    </div>
  );
}

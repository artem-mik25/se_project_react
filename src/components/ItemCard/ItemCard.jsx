// src/components/ItemCard/ItemCard.jsx
import "./ItemCard.css";

export default function ItemCard({ item, onClick, onLike, onDelete }) {
  return (
    <div className="item-card">
      <img
        src={item.link}
        alt={item.name}
        className="item-card__image"
        onClick={() => onClick(item)}
      />
      <p className="item-card__name">{item.name}</p>
      <div className="item-card__actions">
        <button
          className="item-card__like"
          aria-label="Like"
          onClick={() => onLike(item._id)}
        >
          {item.liked ? "❤️" : "♡"}
        </button>
        <button
          className="item-card__delete"
          aria-label="Delete"
          onClick={() => onDelete(item._id)}
        >
          🗑
        </button>
      </div>
    </div>
  );
}

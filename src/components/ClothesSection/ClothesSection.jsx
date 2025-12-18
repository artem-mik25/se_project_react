// src/components/ClothesSection/ClothesSection.jsx
import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

export default function ClothesSection({
  items = [],
  onAddItem,
  onCardClick,
  onCardLike
}) {
  const currentUser = useContext(CurrentUserContext);

  // Filter items to show only current user's items
  const userItems = items.filter(
    (item) => currentUser && item.owner === currentUser._id
  );

  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          type="button"
          className="clothes-section__add"
          onClick={onAddItem}
        >
          + Add new
        </button>
      </div>

      {userItems.length > 0 ? (
        <ul className="clothes-section__grid">
          {userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onClick={() => onCardClick(item)}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      ) : (
        <p className="clothes-section__empty">No items yet.</p>
      )}
    </section>
  );
}

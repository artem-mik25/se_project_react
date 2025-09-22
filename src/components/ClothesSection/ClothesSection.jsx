// src/components/ClothesSection/ClothesSection.jsx
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

export default function ClothesSection({ items = [], onAddItem, onCardClick }) {
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

      {items.length > 0 ? (
        <ul className="clothes-section__grid">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onClick={() => onCardClick(item)}
            />
          ))}
        </ul>
      ) : (
        <p className="clothes-section__empty">No items yet.</p>
      )}
    </section>
  );
}

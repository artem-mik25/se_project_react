// src/components/Main/Main.jsx
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";

export default function Main({
  weather,
  garments,
  onItemClick,
  onLikeToggle,
  onDeleteItem,
  showAll,
  onToggleShowAll,
}) {
  const hasItems = Array.isArray(garments) && garments.length > 0;

  return (
    <main className="main">
      <WeatherCard temp={weather.temp} location={weather.location} />

      {/* Filter controls */}
      <div className="main__controls" role="group" aria-label="Filter items">
        <label className="toggle">
          <input
            type="checkbox"
            checked={showAll}
            onChange={onToggleShowAll}
          />
          <span>Show all clothing items</span>
        </label>
        {!showAll && (
          <span className="hint">
            Showing items for today’s weather only
          </span>
        )}
      </div>

      {hasItems ? (
        <section className="main__items">
          {garments.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onClick={onItemClick}
              onLike={onLikeToggle}
              onDelete={onDeleteItem}
            />
          ))}
        </section>
      ) : (
        <div className="main__empty">
          <h3>No items to show</h3>
          <p>
            Try checking <strong>Show all clothing items</strong>, or click{" "}
            <strong>+ Add clothes</strong> to add your first item.
          </p>
        </div>
      )}
    </main>
  );
}

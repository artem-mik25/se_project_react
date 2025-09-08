// src/components/Main/Main.jsx
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";

export default function Main({
  weather,
  weatherType,
  items,
  showAll,
  onToggleShowAll,
  onCardClick,
  onLikeItem,
  onDeleteItem,
}) {
  // Filter items by weatherType unless "Show all" is on
  const filteredItems = showAll
    ? items
    : items.filter((item) => item.weather === weatherType);

  return (
    <main className="main">
      {weather && (
        <WeatherCard
          city={weather.city}
          country={weather.country}
          temp={weather.temp}
          feelsLike={weather.feelsLike}
          condition={weather.condition}
          icon={weather.icon}
          units={weather.units}
        />
      )}

      <section className="main__clothes-section">
        <div className="main__clothes-header">
          <h2 className="main__title">Your clothes</h2>
          <button
            type="button"
            className="main__toggle"
            onClick={onToggleShowAll}
          >
            {showAll ? "Show by weather" : "Show all"}
          </button>
        </div>

        {filteredItems.length > 0 ? (
          <ul className="main__cards">
            {filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onClick={() => onCardClick(item)}
                onLike={onLikeItem}
                onDelete={onDeleteItem}
              />
            ))}
          </ul>
        ) : (
          <p className="main__empty">No items for this weather.</p>
        )}
      </section>
    </main>
  );
}

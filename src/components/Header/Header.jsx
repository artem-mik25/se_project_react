// src/components/Header/Header.jsx
import "./Header.css";

export default function Header({
  date,
  location,
  onAddClothes,
  username,
  avatarUrl,
}) {
  return (
    <header className="header">
      <div className="header__logo">wtwr°</div>
      <div className="header__center">
        <time className="header__date">{date}</time>
        <span className="header__location">{location}</span>
      </div>
      <div className="header__actions">
        <button
          type="button"
          className="header__add-btn"
          onClick={onAddClothes}
        >
          + Add clothes
        </button>
        <span className="header__user">{username}</span>
        <img
          className="header__avatar"
          src={avatarUrl}
          alt={`${username} avatar`}
        />
      </div>
    </header>
  );
}

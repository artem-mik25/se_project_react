// src/components/Header/Header.jsx
import "./Header.css";
import Logo from "../Logo/Logo.jsx";
import profilePic from "../../assets/Me.png"; // lowercase extension

export default function Header({ city = "—", onAddItem }) {
  // Generate current date like "August 15"
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__inner">
        {/* Left: Logo + date/location pill */}
        <div className="header__left">
          <Logo />
          <div className="header__date-location">
            {currentDate} · {city}
          </div>
        </div>

        {/* Right: Add clothes button + your profile */}
        <div className="header__right">
          <button
            type="button"
            className="header__add-btn"
            onClick={onAddItem}
          >
            + Add clothes
          </button>
          <img
            className="header__avatar"
            src={profilePic}
            alt="Artem Mikhaylov"
          />
          <span className="header__username">Artem Mikhaylov</span>
        </div>
      </div>
    </header>
  );
}

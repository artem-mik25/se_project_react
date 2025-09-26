// src/components/Header/Header.jsx
import "./Header.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import profilePic from "../../assets/Me.png";

export default function Header({ city = "—", onAddItem }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          {/* Logo navigates to home (/) */}
          <Link to="/" aria-label="Go to home">
            <Logo />
          </Link>

          <div className="header__date-location">
            {currentDate} · {city}
          </div>
        </div>

        <div className="header__right">
          <ToggleSwitch />

          <button
            type="button"
            className="header__add-btn"
            onClick={onAddItem}
          >
            + Add clothes
          </button>

          {/* Profile info navigates to /profile */}
          <Link
            to="/profile"
            className="header__profile-link"
            aria-label="Go to profile"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img className="header__avatar" src={profilePic} alt="Artem Mikhaylov" />
            <span className="header__username">Artem Mikhaylov</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

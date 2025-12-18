// src/components/Header/Header.jsx
import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Logo from "../Logo/Logo.jsx";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import defaultAvatar from "../../assets/Me.png";

export default function Header({ city = "—", onAddItem, onLogin, onRegister }) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Use local avatar as fallback
  const avatarSrc = currentUser?.avatar || defaultAvatar;
  const userInitial = currentUser?.name ? currentUser.name[0].toUpperCase() : "?";

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

          {currentUser ? (
            <>
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
                {currentUser.avatar ? (
                  <img className="header__avatar" src={avatarSrc} alt={currentUser.name} />
                ) : (
                  <div
                    className="header__avatar header__avatar--placeholder"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#2f71e5",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {userInitial}
                  </div>
                )}
                <span className="header__username">{currentUser.name}</span>
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="header__add-btn"
                onClick={onRegister}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="header__add-btn"
                onClick={onLogin}
                style={{ marginLeft: "8px" }}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

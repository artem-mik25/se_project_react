// src/components/SideBar/SideBar.jsx
import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import defaultAvatar from "../../assets/Me.png";

export default function SideBar({ onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return (
      <aside className="sidebar">
        <p>Please log in to view your profile</p>
      </aside>
    );
  }

  // Use local avatar as fallback
  const avatarSrc = currentUser.avatar || defaultAvatar;

  return (
    <aside className="sidebar">
      <img className="sidebar__avatar" src={avatarSrc} alt={currentUser.name} />
      <h2 className="sidebar__name">{currentUser.name}</h2>
      <button
        type="button"
        className="sidebar__logout"
        onClick={onLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#ff4444",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Log Out
      </button>
    </aside>
  );
}

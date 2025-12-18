// src/components/SideBar/SideBar.jsx
import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import defaultAvatar from "../../assets/Me.png";

export default function SideBar({ onLogout, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return (
      <aside className="sidebar">
        <p>Please log in to view your profile</p>
      </aside>
    );
  }

  // Use local avatar as fallback or create placeholder with first letter
  const avatarSrc = currentUser.avatar || defaultAvatar;
  const userInitial = currentUser.name ? currentUser.name[0].toUpperCase() : "?";

  return (
    <aside className="sidebar">
      {currentUser.avatar ? (
        <img className="sidebar__avatar" src={avatarSrc} alt={currentUser.name} />
      ) : (
        <div
          className="sidebar__avatar sidebar__avatar--placeholder"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "#2f71e5",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          {userInitial}
        </div>
      )}
      <h2 className="sidebar__name">{currentUser.name}</h2>

      <button
        type="button"
        className="sidebar__edit"
        onClick={onEditProfile}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#2f71e5",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Change profile data
      </button>

      <button
        type="button"
        className="sidebar__logout"
        onClick={onLogout}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          background: "#ff4444",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Log out
      </button>
    </aside>
  );
}

// src/components/Profile/Profile.jsx
import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

export default function Profile({ items, onAddItem, onCardClick, onLogout }) {
  return (
    <main className="profile">
      <SideBar onLogout={onLogout} />
      <ClothesSection
        items={items}
        onAddItem={onAddItem}
        onCardClick={onCardClick}
      />
    </main>
  );
}

// src/components/Profile/Profile.jsx
import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

export default function Profile({ items, onAddItem, onCardClick }) {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        items={items}
        onAddItem={onAddItem}
        onCardClick={onCardClick}
      />
    </main>
  );
}

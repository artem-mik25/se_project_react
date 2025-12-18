// src/components/Profile/Profile.jsx
import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

export default function Profile({
  items,
  onAddItem,
  onCardClick,
  onCardLike,
  onLogout,
  onEditProfile
}) {
  return (
    <main className="profile">
      <SideBar
        onLogout={onLogout}
        onEditProfile={onEditProfile}
      />
      <ClothesSection
        items={items}
        onAddItem={onAddItem}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </main>
  );
}

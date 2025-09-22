// src/components/SideBar/SideBar.jsx
import "./SideBar.css";
import avatar from "../../assets/Me.png";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="User avatar" />
      <h2 className="sidebar__name">Artem Mikhaylov</h2>
    </aside>
  );
}

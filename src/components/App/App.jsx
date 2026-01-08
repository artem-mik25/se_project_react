// src/components/App/App.jsx
import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent.jsx";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

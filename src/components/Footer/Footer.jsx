// src/components/Footer/Footer.jsx
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">© {year} WTWR, powered by React</p>
      </div>
    </footer>
  );
}

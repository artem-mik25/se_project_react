import { useEffect, useMemo } from "react";
import useForm from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

export default function RegisterModal({ isOpen, onRegister, onClose, onSwitchToLogin }) {
  const { values, handleChange, reset } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidUrl = (url) => {
    if (!url) return true; // Avatar is optional
    try {
      const u = new URL(url);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const errors = useMemo(
    () => ({
      email: isValidEmail(values.email) ? "" : "Please enter a valid email.",
      password: values.password.length >= 6 ? "" : "Password must be at least 6 characters.",
      name: values.name.length >= 2 ? "" : "Name must be at least 2 characters.",
      avatar: isValidUrl(values.avatar) ? "" : "Please enter a valid URL.",
    }),
    [values]
  );

  const isValid = useMemo(
    () => !errors.email && !errors.password && !errors.name && !errors.avatar &&
          values.email && values.password && values.name,
    [errors, values]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    const payload = {
      email: values.email,
      password: values.password,
      name: values.name,
      avatar: values.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(values.name) + "&size=200&background=0D8ABC&color=fff",
    };

    const resultPromise = onRegister?.(payload);
    await Promise.resolve(resultPromise);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <label className="modal__label">
        Email*
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && values.email && (
          <span className="hint" role="alert" style={{ display: "block" }}>
            {errors.email}
          </span>
        )}
      </label>

      <label className="modal__label">
        Password*
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && values.password && (
          <span className="hint" role="alert" style={{ display: "block" }}>
            {errors.password}
          </span>
        )}
      </label>

      <label className="modal__label">
        Name*
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          required
          minLength={2}
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && values.name && (
          <span className="hint" role="alert" style={{ display: "block" }}>
            {errors.name}
          </span>
        )}
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          value={values.avatar}
          onChange={handleChange}
        />
        {errors.avatar && values.avatar && (
          <span className="hint" role="alert" style={{ display: "block" }}>
            {errors.avatar}
          </span>
        )}
      </label>

      <button
        type="button"
        className="modal__link"
        onClick={onSwitchToLogin}
        style={{
          background: "none",
          border: "none",
          color: "#0066cc",
          cursor: "pointer",
          textDecoration: "underline",
          padding: 0,
          marginTop: "8px"
        }}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}

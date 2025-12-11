import { useEffect, useMemo } from "react";
import useForm from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

export default function LoginModal({ isOpen, onLogin, onClose, onSwitchToRegister }) {
  const { values, handleChange, reset } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const errors = useMemo(
    () => ({
      email: isValidEmail(values.email) ? "" : "Please enter a valid email.",
      password: values.password.length >= 6 ? "" : "Password must be at least 6 characters.",
    }),
    [values]
  );

  const isValid = useMemo(
    () => !errors.email && !errors.password && values.email && values.password,
    [errors, values]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    const resultPromise = onLogin?.({ email: values.email, password: values.password });
    await Promise.resolve(resultPromise);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      buttonText="Log In"
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <label className="modal__label">
        Email
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
        Password
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

      <button
        type="button"
        className="modal__link"
        onClick={onSwitchToRegister}
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
        or Sign Up
      </button>
    </ModalWithForm>
  );
}

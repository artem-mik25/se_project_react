// src/components/ModalWithForm/ModalWithForm.jsx
import { useEffect, useCallback } from "react";
import "./ModalWithForm.css";

export default function ModalWithForm({
  title = "Modal",
  name = "form",
  buttonText = "Save",
  onClose,
  onSubmit,
  children,
}) {
  // Close on Esc
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Close when clicking the dark overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      onMouseDown={handleOverlayClick}
    >
      <div
        className="modal__content"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          aria-label="Close modal"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="modal__title">{title}</h2>

        <form
          className="modal__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}

          <div className="modal__actions">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

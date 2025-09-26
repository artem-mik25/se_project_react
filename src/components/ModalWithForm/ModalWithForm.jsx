// src/components/ModalWithForm/ModalWithForm.jsx
import { useEffect, useCallback } from "react";
import "./ModalWithForm.css";

/**
 * Props:
 *  - title, name, buttonText
 *  - onClose(), onSubmit(e)
 *  - children (form fields)
 *  - isSubmitDisabled (boolean)
 */
export default function ModalWithForm({
  title = "Modal",
  name = "form",
  buttonText = "Save",
  onClose,
  onSubmit,
  children,
  isSubmitDisabled = false,
}) {
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className={`modal modal_type_${name}`}
      role="dialog"
      aria-modal="true"
      onMouseDown={handleOverlayClick}
    >
      <div className="modal__content" onMouseDown={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal__close"
          aria-label="Close modal"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" name={name} onSubmit={onSubmit} noValidate>
          {children}

          <div className="modal__actions">
            <button
              type="submit"
              className="modal__submit"
              disabled={isSubmitDisabled}
              aria-disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

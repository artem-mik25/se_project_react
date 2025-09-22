// src/components/DeleteConfirmationModal/DeleteConfirmationModal.jsx
import { useEffect, useCallback } from "react";
import "./DeleteConfirmationModal.css";

export default function DeleteConfirmationModal({
  isOpen,
  itemName = "this item",
  onConfirm,
  onCancel,
}) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onCancel?.();
    },
    [onCancel]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel?.();
  };

  return (
    <div className="confirm__overlay" onMouseDown={handleOverlayClick}>
      <div className="confirm__content" onMouseDown={(e) => e.stopPropagation()}>
        <button type="button" className="confirm__close" aria-label="Close" onClick={onCancel}>
          ✕
        </button>

        <h3 className="confirm__title">Delete item?</h3>
        <p className="confirm__text">
          Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
        </p>

        <div className="confirm__actions">
          <button type="button" className="confirm__btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="confirm__btn confirm__btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

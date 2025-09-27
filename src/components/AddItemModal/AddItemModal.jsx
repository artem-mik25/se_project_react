// src/components/AddItemModal/AddItemModal.jsx
import { useEffect, useMemo } from "react";
import useForm from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

export default function AddItemModal({ isOpen, onAddItem, onClose }) {
  const { values, handleChange, reset } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  // Reset fields each time the modal opens
  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  // validation helpers
  const isNonEmpty = (s) => typeof s === "string" && s.trim().length > 0;
  const isUrl = (s) => {
    try {
      const u = new URL(s);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const errors = useMemo(
    () => ({
      name:
        isNonEmpty(values.name) && values.name.trim().length >= 2
          ? ""
          : "Please enter a name (min 2 characters).",
      imageUrl: isUrl(values.imageUrl) ? "" : "Please enter a valid URL.",
      weather: isNonEmpty(values.weather) ? "" : "Please choose a weather type.",
    }),
    [values]
  );

  const isValid = useMemo(
    () => !errors.name && !errors.imageUrl && !errors.weather,
    [errors]
  );

  const handleClose = () => {
    // already reset on open; just close
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    const payload = {
      name: values.name.trim(),
      link: values.imageUrl.trim(),
      weather: values.weather,
    };

    const resultPromise = onAddItem?.(payload);
    await Promise.resolve(resultPromise); // wait for parent to add
    onClose?.(); // close after success (no setState after unmount)
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="New Garment"
      name="add-garment"
      buttonText="Add"
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="e.g., Beanie"
          required
          minLength={2}
          maxLength={30}
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && (
          <span className="hint" role="alert" style={{ display: "block" }}>
            {errors.name}
          </span>
        )}
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Weather type</legend>

        <label className="modal__radio">
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>

        <label className="modal__radio">
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="modal__radio">
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>

        {errors.weather && (
          <span className="hint" role="alert" style={{ display: "block", marginTop: 6 }}>
            {errors.weather}
          </span>
        )}
      </fieldset>

      <label className="modal__label">
        Image URL
        <input
          className="modal__input"
          type="url"
          name="imageUrl"
          placeholder="https://example.com/item.png"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
        {errors.imageUrl && (
          <span className="hint" role="alert" style={{ display: "block" }}>
            {errors.imageUrl}
          </span>
        )}
      </label>
    </ModalWithForm>
  );
}

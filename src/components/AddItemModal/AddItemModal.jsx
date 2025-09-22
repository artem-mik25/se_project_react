// src/components/AddItemModal/AddItemModal.jsx
import useForm from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

export default function AddItemModal({ isOpen, onAddItem, onClose }) {
  // form state
  const { values, handleChange, reset, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  // close → also reset fields
  const handleClose = () => {
    reset();
    onClose?.();
  };

  // submit → call parent handler, then reset on success
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, imageUrl, weather } = values;
    if (!name || !imageUrl || !weather) return;

    // parent will add the item; if successful, reset + close
    const maybePromise = onAddItem?.({ name: name.trim(), link: imageUrl.trim(), weather });
    // support both sync and async handlers
    Promise.resolve(maybePromise).then(() => reset());
  };

  // if you later want to prefill when opened, you could useEffect here
  // for now, we keep it simple.

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="New Garment"
      name="add-garment"
      buttonText="Add"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="e.g., Beanie"
          required
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
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
      </label>
    </ModalWithForm>
  );
}

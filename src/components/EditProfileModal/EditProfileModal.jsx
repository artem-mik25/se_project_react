// src/components/EditProfileModal/EditProfileModal.jsx
import { useEffect, useMemo, useContext } from "react";
import useForm from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import "./EditProfileModal.css";

export default function EditProfileModal({ isOpen, onUpdateProfile, onClose }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, reset, setValues } = useForm({
    name: "",
    avatar: "",
  });

  // Initialize form with current user data when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  // Reset fields when modal closes
  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  // Validation helpers
  const isNonEmpty = (s) => typeof s === "string" && s.trim().length > 0;
  const isUrl = (s) => {
    if (!s || s.trim() === "") return true; // Avatar is optional
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
      avatar: isUrl(values.avatar) ? "" : "Please enter a valid URL or leave empty.",
    }),
    [values]
  );

  const isValid = useMemo(
    () => !errors.name && !errors.avatar,
    [errors]
  );

  const handleClose = () => {
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    const payload = {
      name: values.name.trim(),
      avatar: values.avatar.trim(),
    };

    const resultPromise = onUpdateProfile?.(payload);
    await Promise.resolve(resultPromise);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <label className="modal__label">
        Name *
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
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
        {errors.avatar && (
          <span className="hint" role="alert" style={{ display: "block" }}>
            {errors.avatar}
          </span>
        )}
      </label>
    </ModalWithForm>
  );
}

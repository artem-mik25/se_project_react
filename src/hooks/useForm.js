// src/hooks/useForm.js

import { useState, useCallback } from "react";

/**
 * Simple form state hook:
 * const { values, handleChange, reset, setValues } = useForm({ name: "", imageUrl: "", weather: "" });
 */
export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const reset = useCallback(() => setValues(initialValues), [initialValues]);

  return { values, handleChange, reset, setValues };
}

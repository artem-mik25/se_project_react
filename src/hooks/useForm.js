// src/hooks/useForm.js

import { useState, useCallback, useRef } from "react";

/**
 * Simple form state hook:
 * const { values, handleChange, reset, setValues } = useForm({ name: "", imageUrl: "", weather: "" });
 */
export default function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const initialValuesRef = useRef(initialValues);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const reset = useCallback(() => setValues(initialValuesRef.current), []);

  return { values, handleChange, reset, setValues };
}

// src/utils/api.js

const baseUrl = "http://localhost:3001";

// Get token from localStorage
function getToken() {
  return localStorage.getItem("jwt");
}

// Get headers with optional authentication
function getHeaders(needsAuth = false) {
  const headers = { "Content-Type": "application/json" };
  if (needsAuth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return headers;
}

async function handle(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

function normalize(item) {
  // Ensure every item has _id for the UI (json-server uses "id")
  return { _id: item._id ?? item.id, ...item };
}

export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(handle)
    .then((items) => items.map(normalize));
}

export function addItem({ name, imageUrl, weather }) {
  const body = JSON.stringify({
    name,
    imageUrl,
    weather,
  });
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(true),
    body,
  })
    .then(handle)
    .then(normalize);
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getHeaders(true),
  })
    .then(handle)
    .then(() => true);
}

// Like/unlike item
export function setItemLiked(id, liked) {
  const method = liked ? "PUT" : "DELETE";
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method,
    headers: getHeaders(true),
  })
    .then(handle)
    .then(normalize);
}

// Auth functions
export function signup({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handle);
}

export function signin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handle);
}

export function getCurrentUser() {
  return fetch(`${baseUrl}/users/me`, {
    headers: getHeaders(true),
  }).then(handle);
}

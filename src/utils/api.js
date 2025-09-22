// src/utils/api.js

const baseUrl = "http://localhost:3001";

async function handle(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

function normalize(item) {
  // keep your UI happy by ensuring _id exists
  return { _id: item._id ?? item.id, ...item };
}

export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(handle)
    .then((items) => items.map(normalize));
}

export function addItem({ name, link, weather }) {
  // json-server v1 expects "id" as primary key
  const body = JSON.stringify({
    id: Date.now(),
    name,
    link,
    weather,
    liked: false
  });
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body
  })
    .then(handle)
    .then(normalize);
}

export function deleteItem(id) {
  // id is the primary key in json-server (we pass _id from UI)
  return fetch(`${baseUrl}/items/${id}`, { method: "DELETE" }).then((res) => {
    if (!res.ok) throw new Error(`API ${res.status}: delete failed`);
    return true;
  });
}

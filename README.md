# WTWR (What to Wear?)

A React + Vite application that shows weather and temperature-based clothing recommendations, with a mock JSON API for managing items. Built for TripleTen **Sprint 11 — React Routing & State Management**.

---

## ✨ Features

- **WeatherCard** — current weather, feels like, and °F/°C toggle (via Context).
- **Home (`/`)** — shows clothing **filtered by current weather** with a “Show all / Show by weather” toggle.
- **Profile (`/profile`)** — shows **all** items unfiltered; includes `SideBar` and `ClothesSection`.
- **Add item** — modal with controlled inputs (`useForm`), basic validation, persists to API.
- **Like item** — heart toggle persisted to API.
- **Delete item** — with a confirmation modal.
- **Routing** — `/` and `/profile`, logo → `/`, profile info → `/profile`, and a catch-all redirect to `/`.

---

## 🛠 Tech Stack

- **React 18**, **Vite**
- **React Router DOM 6**
- **React Context** (temperature unit)
- **json-server** (mock API)
- **ESLint + Prettier**
- Plain **CSS** (BEM-style component files)

---

## 📦 Project Structure (high level)

src/
components/
AddItemModal/
ClothesSection/
DeleteConfirmationModal/
Footer/
Header/
ItemCard/
ItemModal/
Logo/
Main/
ModalWithForm/
Profile/
SideBar/
ToggleSwitch/
WeatherCard/
contexts/
CurrentTemperatureUnitContext.js
hooks/
useForm.js
utils/
api.js # GET/POST/DELETE/PATCH (like) against json-server
weatherApi.js # fetchWeather returns both {F,C} + legacy temp in °F
constants.js # COORDS only
vendor/
normalize.css
fonts.css
db.json # mock database (items)


---

## ⚙️ Installation & Setup

> **Requirements:** Node.js 18+ and npm

1) **Clone & install**
```bash
git clone <your-repo-url>
cd <your-repo-folder>
npm install

Create .env with your OpenWeather API key

# .env
VITE_API_KEY=YOUR_OPENWEATHER_API_KEY


Start the mock API (json-server) — in Terminal #1

json-server --watch db.json --id _id --port 3001


API root: http://localhost:3001/

Items endpoint: http://localhost:3001/items

Start the React app — in Terminal #2

npm run dev


App: http://localhost:3000

Keep both terminals running: one for the API (port 3001) and one for the app (port 3000).

🧪 Usage Notes

Home (/) filters by current weather type:

If no items match (e.g., weather is warm but you only have hot/cold items), you’ll see “No items for this weather.”

Click “Show all” to see everything.

Profile (/profile) always lists all items (unfiltered).

Add item via + Add clothes / + Add new:

Fill Name, Image URL, and select Weather (hot/warm/cold).

The “Add” button stays disabled until inputs are valid.

Like / Delete:

Heart toggles persist to db.json.

Delete asks for confirmation and then removes from db.json.

🔧 Scripts
npm run dev        # start Vite dev server (app on http://localhost:3000)
npm run build      # production build
npm run preview    # preview the production build


Run the mock API separately:

json-server --watch db.json --id _id --port 3001

❓ Troubleshooting

“Unexpected token '<' … is not valid JSON”
You opened the app on http://localhost:3001
 (the API). Use http://localhost:3000
 for the app.

Items don’t appear on the home page
That’s expected if no items match today’s weather. Click “Show all” or add a matching item (e.g., “warm”).

API 404 on delete
Ensure your items in db.json use the key _id (json-server's primary key). The app normalizes to _id internally.

🧑‍💻 Author

Artem Mikhaylov
© 2025 WTWR, powered by React
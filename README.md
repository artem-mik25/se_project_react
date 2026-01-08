# WTWR (What to Wear?)

A full-stack React + Vite application that shows weather and temperature-based clothing recommendations with user authentication and item management. Built for TripleTen **Sprint 14 — Front-End Authentication and Authorization**.

## Backend Repository

The Express backend for this project is available at: [se_project_express](https://github.com/artem-mik25/se_project_express)

---

## ✨ Features

- **User Authentication** — signup, signin, and JWT token management
- **Protected Routes** — profile page only accessible to authenticated users
- **WeatherCard** — current weather, feels like, and °F/°C toggle (via Context)
- **Home (`/`)** — shows clothing **filtered by current weather** with a "Show all / Show by weather" toggle
- **Profile (`/profile`)** — shows **your items only**; includes `SideBar` with edit profile and logout buttons
- **Add item** — modal with controlled inputs (`useForm`), validation, persists to Express backend
- **Like/Unlike items** — heart toggle persisted to backend with user authentication
- **Delete item** — with confirmation modal (only for items you own)
- **Edit Profile** — update your name and avatar
- **Routing** — `/` and `/profile`, logo → `/`, profile info → `/profile`, and a catch-all redirect to `/`

---

## 🛠 Tech Stack

### Frontend
- **React 18**, **Vite**
- **React Router DOM 6**
- **React Context** (temperature unit & current user)
- **Custom Hooks** (`useForm`)
- **ESLint + Prettier**
- Plain **CSS** (BEM-style component files)

### Backend
- **Express.js** (Node.js server)
- **MongoDB** + **Mongoose**
- **JWT** authentication
- **bcryptjs** for password hashing
- See [backend repository](https://github.com/artem-mik25/se_project_express) for full details

---

## 📦 Project Structure (high level)

```
src/
  components/
    AddItemModal/
    ClothesSection/
    DeleteConfirmationModal/
    EditProfileModal/
    Footer/
    Header/
    ItemCard/
    ItemModal/
    LoginModal/
    Logo/
    Main/
    ModalWithForm/
    Profile/
    ProtectedRoute/
    RegisterModal/
    SideBar/
    ToggleSwitch/
    WeatherCard/
  contexts/
    CurrentTemperatureUnitContext.js
    CurrentUserContext.jsx
  hooks/
    useForm.js
  utils/
    api.js          # Item CRUD operations
    auth.js         # Authentication functions
    weatherApi.js   # Weather API integration
    constants.js    # API keys and coordinates
  vendor/
    normalize.css
    fonts.css
```


---

## ⚙️ Installation & Setup

> **Requirements:** Node.js 18+, npm, and MongoDB

### 1. Clone the repositories

```bash
# Clone frontend
git clone https://github.com/artem-mik25/hello-vite.git
cd hello-vite
npm install

# Clone backend (in a separate directory)
git clone https://github.com/artem-mik25/se_project_express.git
cd se_project_express
npm install
```

### 2. Setup Environment Variables

**Frontend** - Create `.env` in the `hello-vite` directory:
```env
VITE_API_KEY=YOUR_OPENWEATHER_API_KEY
```

**Backend** - Create `.env` in the `se_project_express` directory (if needed):
```env
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Or run mongod directly
mongod
```

### 4. Start the Backend Server (Terminal #1)

```bash
cd se_project_express
npm start
```

Backend will run on: **http://localhost:3001**

### 5. Start the Frontend (Terminal #2)

```bash
cd hello-vite
npm run dev
```

Frontend will run on: **http://localhost:3000**

### 6. Open the App

Visit **http://localhost:3000** in your browser.

Keep both terminals running: one for the backend (port 3001) and one for the frontend (port 3000).

## 🧪 Usage Notes

### Authentication
- **Sign Up**: Click "Sign Up" in the header, fill in your details (name, email, password, avatar URL)
- **Sign In**: Click "Log In" and enter your credentials
- After logging in, you'll be redirected to the home page

### Home Page (/)
- Shows clothing items filtered by current weather
- Click "Show all" to see all items regardless of weather
- Like button visible only when logged in
- Click any card to view details

### Profile Page (/profile)
- **Protected**: Only accessible when logged in
- Shows **only your items**
- Click "Change profile data" to update your name/avatar
- Click "Log out" to sign out

### Managing Items
- **Add Item**: Click "+ Add clothes" (requires login)
- **Like Item**: Click the heart icon (requires login)
- **Delete Item**: Click delete in the modal (only for items you own)

## 🔧 Scripts

### Frontend
```bash
npm run dev        # start Vite dev server
npm run build      # production build
npm run preview    # preview production build
npm run lint       # run ESLint
```

### Backend
```bash
npm start          # start Express server
npm run dev        # start with nodemon (auto-reload)
npm run lint       # run ESLint
```

## ❓ Troubleshooting

**Backend not connecting**
- Make sure MongoDB is running (`mongod`)
- Check if port 3001 is available
- Verify backend is running on http://localhost:3001

**Can't access /profile page**
- Make sure you're logged in
- Check that the token is stored in localStorage
- Try refreshing the page

**Items don't appear on home page**
- Normal if no items match the current weather
- Click "Show all" to see everything
- Or add items that match today's weather

**Authorization errors**
- Make sure both frontend and backend are running
- Check that you're logged in
- Verify the backend URL in `src/utils/api.js` and `src/utils/auth.js` is correct (http://localhost:3001)

🧑‍💻 Author

Artem Mikhaylov
© 2025 WTWR, powered by React


 ## Project Pitch Video
 
 Check out [this video](> https://docs.google.com/document/d/1gXbbRhLVwvxKgdXNVFb-ZtOOmJxyb-UzRkGqArbMMIA/edit?usp=sharing 
), where I describe my 
 project and some challenges I faced while building it.
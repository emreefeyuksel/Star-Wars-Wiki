# 🌌 Star Wars Wiki Explorer

A premium, highly interactive, and fully responsive **Star Wars Encyclopedia** built as a web application. This project consumes the [SWAPI (The Star Wars API)](https://swapi.dev/) to fetch and display comprehensive data about films, characters, planets, starships, vehicles, and species.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer-Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

## ✨ Features

- 📚 **Comprehensive Database**: Browse through 6 fully featured categories (`Characters`, `Films`, `Planets`, `Starships`, `Vehicles`, `Species`).
- 🔗 **Deep Cross-Linking**: Contextual relational data! Viewing a character doesn't just show their stats, it displays clickable cards for the starships they flew, the films they starred in, and the planet they were born on.
- 🌓 **Dark/Light Mode Setup**: Handcrafted Tailwind UI that flawlessly transitions between Light and Dark mode using manual toggle systems.
- 🎲 **Hyperdrive Random Explorer**: A floating dice tool that calculates a hyperdrive jump to drop you into a completely random page in the galaxy.
- ⭐ **Persistent Favorites System**: Save your favorite characters or ships. The data is cached strictly in your browser's `localStorage` and categorizable via a smart tabbed UI.
- 💫 **Dynamic Starfield Background**: An invisible layer of over 150 randomized twinkling CSS stars that creates a subtle, beautiful spatial depth effect in Dark Mode.
- 📱 **Mobile First & Responsive**: Perfectly scales from 4K desktop monitors down to mobile screens with off-canvas hamburger navigation.

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** Tailwind CSS v4 (with custom `@custom-variant` dark mode)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data Source:** [SWAPI API](https://swapi.dev/)

## 🚀 Installation & Running Locally

Follow these steps to run the project securely on your local environment.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/emreefeyuksel/Star-Wars-Wiki.git
   cd Star-Wars-Wiki
   ```

2. **Install dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Explore the Galaxy:**
   Open your browser and navigate to `http://localhost:5173/` (or the port specified by Vite in your terminal).

## 🗂️ Project Architecture

```
src/
├── assets/          # Static assets and icons
├── components/      # Reusable UI components (Navbar, Starfield, RandomExplorer)
├── pages/           # Core page routes (Home, Favorites, Detail & List Views)
├── services/        # API business logic (api.js containing fetch controllers)
├── App.jsx          # React Router configuration & Layout assembly
├── index.css        # Global CSS + Tailwind configuration
└── main.jsx         # React DOM Entry Point
```

## 📝 Academic Context
This application was originally developed as a highly polished **Midterm Project** for the *Web Programming SE 3355* course. The primary objective was to strengthen understanding of frontend development with React and JSON-based data retrieval from web APIs while delivering a clean, modern, and beautiful interface.

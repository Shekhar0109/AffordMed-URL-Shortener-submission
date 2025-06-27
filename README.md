# 🚀 AffordMed URL Shortener

A user-friendly React application that shortens URLs with optional custom shortcodes, expiry durations, and displays detailed click analytics — all managed on the client-side. Built for AffordMed's Campus Hiring Evaluation.

---

## 📦 Project Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### ✅ Prerequisites

- Node.js ≥ v14  
- npm ≥ v6

## 🔧 Getting Started

In the project directory, run:


npm install
npm start
Then open http://localhost:3000 in your browser.

🧰 Features
🔗 Shorten up to 5 URLs at once

✏️ Optional custom shortcodes (alphanumeric)

⏳ Optional validity period (defaults to 30 minutes)

📊 Statistics page with:

Total clicks per short URL

Timestamps of each click

Mock referrer and location (client-side only)

🔁 Redirection via React Router (/:code)

🗃️ Data stored using localStorage (no backend)

🔒 Custom Logging Middleware (no console.log)

💅 Styled with Material UI

🗂️ Folder Structure
less
Copy
Edit
src/
├── components/
│   └── URLForm.js
├── context/
│   └── Logger.js         // Custom Logging Middleware
├── pages/
│   ├── ShortenerPage.js  // Home URL input page
│   ├── StatsPage.js      // Analytics dashboard
│   └── RedirectHandler.js// Redirects /:code → original URL
├── App.js
└── index.js
🚀 Available Scripts
Command	Description
npm start	Runs app in development mode
npm run build	Builds app for production
npm test	Starts test runner
npm run eject	Ejects from Create React App setup

💡 The app auto-reloads when you edit any file.
📦 Build Details
The app is bundled and optimized with Webpack.
Production build will be minified and filenames include content hashes.
Deployment-ready after running npm run build.

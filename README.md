# TechLearn Solutions

TechLearn Solutions is a full-stack e-learning platform with a React/Vite frontend and a Node.js/Express backend powered by MongoDB. It delivers structured courses, secure authentication, and a daily Question of the Day (QOTD) coding challenge.

## Features
- Course catalog with structured learning paths and markdown-based content.
- User authentication with JWT and protected routes.
- Student dashboard for profile and progress.
- Admin-ready backend models and routes.
- Mobile-responsive UI.
- Daily QOTD challenge with language-limited execution, run limits, and leaderboard controls.

## Tech Stack
Frontend:
- React 18, Vite
- React Router, Framer Motion
- React Markdown, Remark GFM

Backend:
- Node.js, Express
- MongoDB, Mongoose
- JWT authentication
- Dotenv, CORS

## Project Structure
```text
techlearn/
├── src/                        # Frontend source
│   ├── assets/                 # Brand assets and logos
│   ├── components/             # Reusable UI components
│   ├── contexts/               # React contexts (Auth)
│   ├── pages/                  # Page views
│   ├── routes/                 # Route configuration
│   ├── services/               # API service layer
│   ├── App.jsx                 # Root component
│   └── index.jsx               # Entry point
├── server/                     # Backend source
│   ├── config/                 # Configuration
│   ├── controllers/            # Request handlers
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API endpoints
│   ├── coursesData/            # Course data and seeder
│   └── index.js                # Server entry point
├── dist/                       # Production build output
├── public/                     # Static assets
├── vercel.json                 # Vercel deployment config
└── vite.config.js              # Vite configuration
```

## Getting Started

Prerequisites:
- Node.js v18+
- MongoDB Atlas account or local MongoDB

Local development:
1. Backend
   ```bash
   cd server
   npm install
   # Create .env with:
   # PORT=5001
   # MONGO_URI=your_mongodb_uri
   npm run dev
   ```
2. Frontend
   ```bash
   cd ..
   npm install
   # Create .env.local with:
   # VITE_API_URL=http://localhost:5001/api
   npm run dev
   ```

## Deployment
Frontend (Vercel):
- Build command: `npm run build`
- Output directory: `dist`
- `vercel.json` is configured for SPA routing.

Backend (Render or similar):
- Root directory: `server`
- Build command: `npm install`
- Start command: `node index.js`
- Environment: `MONGO_URI`, `NODE_ENV=production`, `JWT_SECRET`, `JUDGE0_KEY`

## Documentation
- QOTD rules and API: `QOTD.md`

## License
MIT

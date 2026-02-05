# TechLearn Solutions 🎓

**TechLearn Solutions** is a premium, full-stack e-learning platform designed for aspiring developers. It features a modern React-based frontend and a robust Node.js/Express backend with MongoDB integration.

## ✨ Features

- **Dynamic Hero Section**: Interactive 3D floating icons and a sleek typewriter animation.
- **Course Catalog**: Structured learning paths with categorized courses and detailed curriculums.
- **Learning Experience**: Deep-linked course topics with markdown support for rich content delivery.
- **Student Dashboard**: Personalized interface for managing learning progress and account details.
- **Secure Authentication**: Complete JWT-based authentication flow (Login/Register) with protected routes.
- **Admin Ready**: Backend models and routes prepared for course management and user administration.
- **Mobile Responsive**: Fluid, modern UI optimized for all screen sizes using CSS variables and Framer Motion.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Modern Design System) + [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown) + [Remark GFM](https://github.com/remarkjs/remark-gfm)

### Backend
- **Server**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Environment**: [Dotenv](https://github.com/motdotla/dotenv)
- **CORS**: Configured for secure cross-origin requests.

## 📁 Project Structure

```text
techlearn/
├── src/                        # Frontend Source
│   ├── assets/                 # Brand assets and university logos
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Shared components (Buttons, Cards, etc.)
│   │   ├── home/               # Components specific to the landing page
│   │   └── layout/             # Persistent components (Navbar, Footer)
│   ├── contexts/               # React Contexts (AuthContext)
│   ├── pages/                  # Full page views
│   │   ├── Home.jsx            # Landing page
│   │   ├── Courses.jsx         # Course catalog
│   │   ├── CourseDetail.jsx    # Individual course overview
│   │   ├── Learn.jsx           # Main learning interface
│   │   ├── CourseTopic.jsx     # Specific topic lesson view
│   │   ├── Dashboard.jsx       # Student profile and progress
│   │   └── Login/Register.jsx  # Authentication views
│   ├── routes/                 # Routing configuration
│   │   ├── AppRoutes.jsx       # Route definitions
│   │   └── ProtectedRoute.jsx  # Auth-guarded routes
│   ├── services/               # API service layer (Axios/Fetch)
│   ├── App.jsx                 # Root component
│   └── index.jsx               # Entry point
├── server/                     # Backend Source
│   ├── config/                 # Configuration (Database connection)
│   ├── controllers/            # Business logic / Request handlers
│   ├── models/                 # Mongoose schemas (User, Course)
│   ├── routes/                 # API endpoint definitions
│   ├── coursesData/            # Initial course data (JSON) and Seeder
│   └── index.js                # Server entry point
├── dist/                       # Production build output
├── public/                     # Static assets
├── vercel.json                 # Vercel deployment config
└── vite.config.js              # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local instance

### Local Development

1. **Setup Backend:**
   ```bash
   cd server
   npm install
   # Create a .env file with:
   # PORT=5001
   # MONGO_URI=your_mongodb_uri
   npm run dev
   ```

2. **Setup Frontend:**
   ```bash
   cd ..
   npm install
   # Create a .env.local file with:
   # VITE_API_URL=http://localhost:5001/api
   npm run dev
   ```

## 🌐 Deployment

### Frontend (Vercel)
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Config**: Root-level `vercel.json` ensures SPA routing works on refresh.

### Backend (Render)
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node index.js`
- **Environment Variables**: Add `MONGO_URI` and `NODE_ENV=production`.

## 📄 License

This project is licensed under the MIT License.

---

*Don't just use technology, build it.* 🚀

# TechLearn Solutions 🎓

**TechLearn Solutions** is a modern, premium e-learning platform designed for aspiring developers. It provides a structured learning path, interactive coding challenges, and a robust assessment system tailored for university students.

## ✨ Features

- **Dynamic Hero Section**: Interactive 3D floating icons and a sleek typewriter animation.
- **Structured Learning**: Categorized courses with progress tracking and deep linking to specific topics.
- **TechPrep Assessment**: Tailored prep modules integrated with top university partners (UoH, VJIT, VNR VJIET, Mahindra University).
- **Code Workout & Lab**: Browser-based coding environment supporting Python, Java, and JavaScript (Coming Soon).
- **Dashboard Interface**: Personalized student dashboard for managing progress and certifications.
- **Mobile Responsive**: Fully optimized for all screen sizes with a fluid, modern UI.
- **Secure Authentication**: Protected routes and authentication context for a secure user experience.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: TailwindCSS, Framer Motion (Animations)
- **Icons**: Lucide React, React Icons
- **Routing**: React Router DOM (v6)
- **State Management**: React Context API (AuthContext)

## 📁 Project Structure

```text
src/
├── assets/             # Images, university logos, and brand assets
├── components/
│   ├── common/         # Reusable UI components (CourseCard, ComingSoon, Stats)
│   ├── home/           # Home page specific sections (Hero, FeatureStack, Reviews)
│   └── layout/         # Persistent wrappers (Navbar, Footer, Sidebar)
├── contexts/           # Global state (AuthContext)
├── pages/              # Main page components (Home, Courses, Dashboard, etc.)
├── routes/             # Route definitions and ProtectedRoute logic
└── services/           # External API configurations
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/amritesh-0/TechLearn.git
   cd techlearn
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🗺️ Roadmap

- [ ] Interactive Video Lessons Integration
- [ ] Real-time Peer Coding Sessions
- [ ] Advanced AI-based Personalized Learning Paths
- [ ] Mobile App (React Native)

## 📄 License

This project is licensed under the MIT License.

---

*Don't just use technology, build it.* 🚀

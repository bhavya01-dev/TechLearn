import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useState, useEffect } from 'react';
import Loader from './pages/QOTD.jsx';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AppContent = () => {
  const location = useLocation();
  // Hide Navbar/Footer on dashboard/login/qotd for cleaner UI
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isQOTDPage = location.pathname === '/qotd';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE] via-[#EAF5FF] to-[#F8FAFC] dark:from-[#0a0f1c] dark:via-[#0d1526] dark:to-[#0f1a2e] font-sans selection:bg-[#2563EB] selection:text-white overflow-x-hidden flex flex-col transition-colors duration-300">
      {!isAuthPage && !isQOTDPage && <Navbar />}
      <main className="flex-grow w-full">
        <AppRoutes />
      </main>
      {!isAuthPage && !isQOTDPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

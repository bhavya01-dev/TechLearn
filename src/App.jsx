import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';

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
  // Hide Navbar/Footer on dashboard/login for cleaner UI
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F2FE] via-[#EAF5FF] to-[#F8FAFC] font-sans selection:bg-[#2563EB] selection:text-white overflow-x-hidden flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow w-full">
        <AppRoutes />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
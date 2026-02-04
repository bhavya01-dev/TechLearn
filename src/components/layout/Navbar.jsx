import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Moon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: 'Learn', href: '/learn' },
    { name: 'Build', href: '/coming-soon' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/70 backdrop-blur-md shadow-sm py-4'
        : 'bg-transparent py-6'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-8xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center cursor-pointer group">
          <img
            src={logo}
            alt="TechLearn Logo"
            className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`font-medium transition-colors text-sm tracking-wide ${location.pathname === link.href
                ? 'text-[#1E3A8A] font-bold'
                : 'text-[#334155] hover:text-[#1E3A8A]'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="text-[#334155] hover:text-[#1E3A8A] font-medium transition-colors text-sm tracking-wide">
            Log In
          </Link>
          <button className="text-[#334155] hover:text-[#1E3A8A] transition-colors">
            <Moon size={20} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#1E3A8A]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-100"
        >
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-medium text-lg ${location.pathname === link.href ? 'text-[#1E3A8A]' : 'text-[#334155]'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="font-medium text-lg text-[#334155]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Log In
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

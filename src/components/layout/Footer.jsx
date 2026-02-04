import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#020617] to-[#1E3A8A] text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        <div>
          <h3 className="text-xl font-bold mb-6 tracking-wide">CONNECT</h3>
          <ul className="space-y-4 text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
            <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6 tracking-wide">EXPLORE</h3>
          <ul className="space-y-4 text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Free Courses</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6 tracking-wide">COMPANY</h3>
          <ul className="space-y-4 text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Terms and Conditions</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 border-t border-white/10 pt-8 flex justify-between items-center flex-col md:flex-row gap-4">
        <p className="text-sm text-gray-400">© 2025 TechLearn Solutions. All rights reserved.</p>
        <p className="text-sm text-gray-500 font-mono">Don't just use technology, build it.</p>
      </div>
    </footer>
  );
};

export default Footer;
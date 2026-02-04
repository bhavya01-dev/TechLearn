import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookStackIllustration = () => (
  <motion.div
    className="relative w-64 h-64 md:w-96 md:h-96"
    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    {/* Abstract Book Stack Representation */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* Book 3 (Bottom) */}
      <div className="w-48 h-60 bg-[#1E3A8A] rounded-r-2xl transform rotate-12 translate-x-4 translate-y-4 shadow-2xl border-l-8 border-[#0F172A] relative">
        <div className="absolute inset-y-4 right-4 w-2 bg-[#2563EB]/30 rounded-full"></div>
      </div>
      {/* Book 2 (Middle) */}
      <div className="w-48 h-60 bg-[#2563EB] rounded-r-2xl transform -rotate-6 -translate-x-2 -translate-y-2 shadow-xl border-l-8 border-[#1E3A8A] relative z-10">
        <div className="absolute top-8 left-6 w-12 h-16 border-2 border-white/20 rounded-md"></div>
      </div>
      {/* Book 1 (Top) */}
      <div className="w-48 h-60 bg-[#172554] rounded-r-2xl transform rotate-6 translate-x-2 -translate-y-8 shadow-2xl border-l-8 border-[#334155] relative z-20 flex items-center justify-center">
        <BookOpen size={64} className="text-white/20" />
        <div className="absolute bottom-6 right-6 w-8 h-1 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-8 right-6 w-12 h-1 bg-white/20 rounded-full"></div>
      </div>
    </div>
  </motion.div>
);

const Learn = () => {
  return (
    <div className="pt-20">

      {/* Learn Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9]">
              <span className="block text-[#2563EB] italic font-serif" style={{ fontFamily: 'Georgia, serif' }}>learn</span>
              <span className="block text-[#1E3A8A] font-inter">CODING</span>
            </h1>
            <motion.p
              className="mt-8 text-[#2563EB] text-xl md:text-2xl font-medium max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Warning: Coding skills may cause sudden job offers and inflated Git pushes.
            </motion.p>
          </motion.div>

          <div className="flex justify-center items-center z-10">
            <BookStackIllustration />
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/20 blur-[100px] rounded-full pointer-events-none -z-0"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/20 blur-[100px] rounded-full pointer-events-none -z-0"></div>

        </div>
      </section>

      {/* Code Book Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm border-t border-blue-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-none">
              <span className="block text-[#2563EB] italic font-serif" style={{ fontFamily: 'Georgia, serif' }}>code</span>
              <span className="block text-[#1E3A8A]">BOOK</span>
            </h2>
            <h3 className="text-2xl text-[#1E3A8A] font-semibold mb-6">
              Fundamentals First. Brilliance Next.
            </h3>
            <p className="text-[#334155] text-lg mb-8 leading-relaxed max-w-xl">
              Learn through interactive lessons, real-world projects, and hands-on coding challenges designed to accelerate your learning journey.
            </p>

            <ul className="space-y-4 mb-10">
              {['24 Interactive Lessons', 'Code Playground', 'Progress Tracking'].map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 text-[#334155] font-medium text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></div>
                  {item}
                </motion.li>
              ))}
            </ul>

            <Link to="/learn/courses">
              <motion.button
                className="bg-[#10B981] hover:bg-[#059669] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-lg"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Learning <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Video / Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <video
                src="https://techlearnsolutions.com/videos/book-light.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover bg-slate-100"
              />
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default Learn;
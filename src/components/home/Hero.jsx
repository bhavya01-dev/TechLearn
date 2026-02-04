import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript } from 'react-icons/si';

const FloatingIcon = ({
  icon: Icon,
  delay,
  duration,
  x,
  y,
  rotate,
  size,
  color
}) => {
  return (
    <motion.div
      className="absolute z-0 flex items-center justify-center pointer-events-none"
      style={{ left: x, top: y, color: color }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0.3, 0.6, 0.3], // Soft opacity
        y: [0, -30, 0], // Floating Y
        rotate: [rotate - 5, rotate + 5, rotate - 5], // Gentle rotation
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <div className="relative">
        {/* Blur effect backing */}
        <div className="absolute inset-0 bg-current opacity-20 blur-xl rounded-full" />
        <Icon size={size} className="drop-shadow-sm filter blur-[0.5px]" />
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const titleText = "TechLearn";

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1 }
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Background Floating Icons */}
      <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto">
        <FloatingIcon icon={FaHtml5} color="#E44D26" size={60} x="15%" y="20%" delay={0} duration={8} rotate={-10} />
        <FloatingIcon icon={FaCss3Alt} color="#264DE4" size={55} x="75%" y="15%" delay={2} duration={9} rotate={10} />
        <FloatingIcon icon={FaReact} color="#61DAFB" size={70} x="10%" y="60%" delay={1} duration={10} rotate={-15} />
        <FloatingIcon icon={FaPython} color="#3776AB" size={65} x="85%" y="55%" delay={3} duration={11} rotate={15} />
        <FloatingIcon icon={FaJs} color="#F7DF1E" size={50} x="50%" y="15%" delay={4} duration={12} rotate={5} />
        <FloatingIcon icon={SiTailwindcss} color="#38B2AC" size={80} x="80%" y="80%" delay={1.5} duration={9.5} rotate={-5} />
        <FloatingIcon icon={SiTypescript} color="#3178C6" size={55} x="20%" y="85%" delay={2.5} duration={8.5} rotate={10} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-[#1E3A8A] tracking-[0.2em] mb-6 flex justify-center items-center flex-wrap uppercase"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {titleText.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
          <motion.span variants={letterVariants} className="text-[#2563EB] tracking-normal">;</motion.span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl font-medium text-[#1E3A8A] mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          Don't Just Use Technology, Build It.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
        >
          <motion.button
            className="bg-white text-[#1E3A8A] font-bold py-4 px-10 rounded-xl text-lg shadow-lg border border-blue-50"
            whileHover={{
              y: -4,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Start for Free
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative gradient fog at bottom */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#EAF5FF] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
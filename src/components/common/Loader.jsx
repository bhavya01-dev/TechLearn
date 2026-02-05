import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => (
  <motion.div
    className="flex flex-col items-center justify-center gap-6"
    initial={{ opacity: 0, scale: 0.92, filter: 'blur(2px)' }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, scale: 0.96, filter: 'blur(2px)' }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    role="status"
    aria-live="polite"
  >
    <svg className="loader-cube" width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Loading">
      <defs>
        <linearGradient id="cubeTop" x1="60" y1="6" x2="120" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#79A3FF" />
          <stop offset="1" stopColor="#4C7DFF" />
        </linearGradient>
        <linearGradient id="cubeLeft" x1="30" y1="30" x2="80" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B74FF" />
          <stop offset="1" stopColor="#1E5AE8" />
        </linearGradient>
        <linearGradient id="cubeRight" x1="90" y1="30" x2="130" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2F63F3" />
          <stop offset="1" stopColor="#184DD6" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="6" floodColor="#1E3A8A" floodOpacity="0.2" />
        </filter>
      </defs>
      <g filter="url(#softShadow)">
        <path d="M80 8L124 32L80 56L36 32L80 8Z" fill="url(#cubeTop)" />
        <path d="M36 32L80 56V100L36 76V32Z" fill="url(#cubeLeft)" />
        <path d="M80 56L124 32V76L80 100V56Z" fill="url(#cubeRight)" />
        <path d="M80 56L102 68V92L80 100V56Z" fill="#275DEA" />
        <path d="M56 46L80 56L56 68L32 58L56 46Z" fill="#8AB0FF" />
      </g>
    </svg>
    <svg className="loader-shadow" width="132" height="40" viewBox="0 0 132 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="shadowFade" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(66 20) scale(52 14)">
          <stop stopColor="#0F172A" stopOpacity="0.5" />
          <stop offset="1" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="66" cy="20" rx="52" ry="14" fill="url(#shadowFade)" />
    </svg>
  </motion.div>
);

export default Loader;

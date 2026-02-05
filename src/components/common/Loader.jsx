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
    <div className="loader-stagger" aria-label="Loading">
      <span />
      <span />
      <span />
    </div>
  </motion.div>
);

export default Loader;

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

const statsData = [
  { value: '10+', label: 'Courses Offered' },
  { value: '400+', label: 'Batches Completed' },
  { value: '5101+', label: 'Students Trained' },
  { value: '4.6', label: 'Google Rating' },
];

const StatItem = ({ value, label, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  // Parse numeric value and suffix
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const isDecimal = value.includes('.');

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (isDecimal) {
      return latest.toFixed(1);
    }
    return Math.round(latest).toString();
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, { duration: 2.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, numericValue, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <motion.h3
        className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-2 font-inter tracking-tight"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1 + 0.1,
          type: "spring",
          stiffness: 100
        }}
      >
        <motion.span>{rounded}</motion.span>{suffix}
      </motion.h3>
      <p className="text-[#334155] text-lg font-medium">{label}</p>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {statsData.map((stat, index) => (
            <StatItem key={index} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
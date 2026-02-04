import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';



const CourseCard = ({ id, title, description, rating, duration, level, image }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow"
      whileHover={{ y: -5 }}
    >
      <div className="h-48 bg-slate-200 relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-[#1E3A8A]">
          {level}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-slate-700">{rating}</span>
          <span className="text-slate-300">•</span>
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-500">{duration}</span>
        </div>
        <h3 className="text-xl font-bold text-[#0F172A] mb-2">{title}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{description}</p>
        <Link
          to={`/courses/${id}`}
          className="inline-flex items-center gap-2 text-[#2563EB] font-semibold hover:gap-3 transition-all"
        >
          View Course <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;

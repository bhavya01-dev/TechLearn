import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, CheckCircle } from 'lucide-react';
import { FaPython, FaJava, FaReact } from 'react-icons/fa';
import { SiC, SiJavascript } from 'react-icons/si';
import { api } from '../services/api';

const courseVisuals = [
  {
    test: (title) => /\bc\b|\bc programming\b|\bc language\b/i.test(title),
    icon: SiC,
    color: '#3949AB',
    bgColor: '#E0E7FF'
  },
  {
    test: (title) => /python/i.test(title),
    icon: FaPython,
    color: '#3776AB',
    bgColor: '#E0F2FE'
  },
  {
    test: (title) => /java(?!script)/i.test(title),
    icon: FaJava,
    color: '#E44D26',
    bgColor: '#FEE2E2'
  },
  {
    test: (title) => /javascript/i.test(title),
    icon: SiJavascript,
    color: '#EAB308',
    bgColor: '#FEF9C3'
  },
  {
    test: (title) => /react/i.test(title),
    icon: FaReact,
    color: '#0EA5E9',
    bgColor: '#E0F2FE'
  }
];

const getCourseVisual = (title = '') => {
  const match = courseVisuals.find((item) => item.test(title));
  return match || {
    icon: FaReact,
    color: '#1E3A8A',
    bgColor: '#E2E8F0'
  };
};

const CategoryCard = ({ id, title, icon: Icon, color, bgColor }) => (
  <Link to={`/learn/courses/${id}`}>
    <motion.div
      className="rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
      whileHover={{ y: -5 }}
    >
      <div className="h-48 flex items-center justify-center" style={{ backgroundColor: bgColor }}>
        <Icon size={80} color={color} className="drop-shadow-sm" />
      </div>
      <div className="p-6 bg-white text-center border-t border-slate-100">
        <h3 className="text-xl font-bold text-[#1E3A8A]">{title}</h3>
      </div>
    </motion.div>
  </Link>
);

const DetailedCourseCard = ({ course }) => (
  <motion.div
    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    whileHover={{ y: -5 }}
  >
    <div className="mb-4">
      <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${course.level === 'Beginner' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
        {course.level}
      </span>
    </div>

    <h3 className="text-xl font-bold text-[#0F172A] mb-1">{course.title}</h3>

    <p className="text-slate-500 text-sm mb-6">
      with <span className="text-[#2563EB] font-medium hover:underline cursor-pointer">{course.instructor || 'TechLearn Expert'}</span>
    </p>

    <div className="space-y-3 mb-6">
      <div className="flex items-center text-slate-600 text-sm">
        <Clock size={16} className="mr-3 text-slate-400" />
        <span>{course.duration || 'Flexible'}</span>
      </div>
      <div className="flex items-center text-slate-600 text-sm">
        <Calendar size={16} className="mr-3 text-slate-400" />
        <span>Schedule: {course.schedule || 'Self-paced'}</span>
      </div>
    </div>

    <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow">
      {course.description}
    </p>

    <Link to={`/learn/courses/${course._id}`}>
      <button className="w-full bg-[#1E3A8A] text-white font-bold py-3 rounded-xl hover:bg-[#152865] transition-colors mt-auto">
        Get Started
      </button>
    </Link>
  </motion.div>
);

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        if (res.success) {
          setCourses(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const featuredCourses = courses.slice(0, 3);
  const liveBatches = [
    {
      level: 'Beginner',
      levelTone: 'bg-green-100 text-green-700',
      title: 'Python Programming',
      instructor: 'Prashanti Vasi',
      duration: '2 weeks',
      schedule: 'Mon-Sat',
      time: '11:30 AM - 12:30 PM',
      status: 'In Progress',
      description: 'Master Python fundamentals with live interactive classes. Learn programming concepts and build projects.'
    },
    {
      level: 'Intermediate',
      levelTone: 'bg-amber-100 text-amber-700',
      title: 'DSA with Java',
      instructor: 'Prashanti Vasi',
      duration: '3 weeks',
      schedule: 'Mon-Sat',
      time: '10:00 AM - 11:00 AM',
      status: 'In Progress',
      description: 'Deep dive into Data Structures and Algorithms using Java. Build problem-solving skills with real cases.'
    },
    {
      level: 'Intermediate',
      levelTone: 'bg-amber-100 text-amber-700',
      title: 'DSA with Python',
      instructor: 'Prashanti Vasi',
      duration: '3 weeks',
      schedule: 'Mon-Sat',
      time: '10:00 AM - 11:00 AM',
      status: 'In Progress',
      description: 'Master Data Structures and Algorithms with Python. Learn efficient coding patterns and techniques.'
    },
    {
      level: 'Beginner',
      levelTone: 'bg-green-100 text-green-700',
      title: 'Web Development',
      instructor: 'Jyotsna',
      duration: '3 weeks',
      schedule: 'Mon-Sat',
      time: '6:00 PM - 7:00 PM',
      status: 'In Progress',
      description: 'Learn modern web development from scratch. Build responsive websites and web applications.'
    }
  ];

  return (
    <div className="bg-[#EAF5FF] min-h-screen pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-[#1E3A8A] mb-4 tracking-tighter uppercase">Courses</h1>
          <p className="text-[#2563EB] text-xl font-medium">Discover our comprehensive learning programs</p>
        </div>

        {/* Featured Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredCourses.map((course) => {
            const { icon, color, bgColor } = getCourseVisual(course.title);
            return (
              <CategoryCard
                key={course._id}
                id={course._id}
                title={course.title}
                icon={icon}
                color={color}
                bgColor={bgColor}
              />
            );
          })}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mb-20">
          <button className="bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            View All Courses <ArrowRight size={20} />
          </button>
        </div>

        {/* Detailed Course Grid */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] tracking-tight uppercase">Live Batches</h2>
            <span className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.2)]" />
          </div>
          <p className="text-slate-500 text-lg mt-2">Accelerate your learning with expert-led classes.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveBatches.map((batch) => (
            <motion.div
              key={batch.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${batch.levelTone}`}>
                  {batch.level}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#0F172A] mb-6">{batch.title}</h3>

              <p className="text-slate-500 text-sm mb-6">
                with <span className="text-[#2563EB] font-medium hover:underline cursor-pointer">{batch.instructor}</span>
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-slate-600 text-sm">
                  <Clock size={16} className="mr-3 text-slate-400" />
                  <span>{batch.duration}</span>
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <Calendar size={16} className="mr-3 text-slate-400" />
                  <span>Schedule: {batch.schedule}</span>
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <Clock size={16} className="mr-3 text-slate-400" />
                  <span>Time: {batch.time}</span>
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <CheckCircle size={16} className="mr-3 text-slate-400" />
                  <span>Starts: {batch.status}</span>
                </div>
              </div>

              <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow">
                {batch.description}
              </p>

              <button className="w-full bg-[#1E3A8A] text-white font-bold py-3 rounded-xl hover:bg-[#152865] transition-colors mt-auto">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Courses;

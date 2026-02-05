import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Award, Play, ChevronRight, User } from 'lucide-react';
import { api } from '../services/api';

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        if (res.success) {
          setCourse(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch course', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#CCEEFF] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8A]"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#CCEEFF] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Course not found</h2>
        <Link to="/learn/courses" className="text-[#2563EB] hover:underline">Back to Courses</Link>
      </div>
    );
  }

  const tabs = ['Overview', 'Curriculum', 'Instructor'];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Minimal Navbar / Back Link */}
      <div className="bg-[#CCEEFF] pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/learn/courses" className="inline-flex items-center text-[#1E3A8A] hover:text-[#2563EB] transition-colors font-medium gap-2">
            <ArrowLeft size={18} />
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#CCEEFF] pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#FEF3C7] text-[#92400E] px-3 py-1 rounded-lg text-sm font-bold mb-8">
              {course.level}
            </span>

            <h1 className="text-7xl md:text-8xl font-bold text-[#1E3A8A] mb-8 tracking-tighter">
              {course.title.split(" ")[0]}
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-8 items-center mb-12">
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <Clock size={20} className="text-[#1E3A8A]" />
                {course.duration || '6 weeks'}
              </div>
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <BookOpen size={20} className="text-[#1E3A8A]" />
                {course.topics?.length || 0} topics
              </div>
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <CheckCircle size={20} className="text-green-500" />
                Lifetime access
              </div>
            </div>

            <Link to={`/learn/courses/${id}/learn`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#059669] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-lg hover:bg-[#047857] transition-all"
              >
                <Play size={20} fill="currentColor" />
                Start Learning
                <ChevronRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sticky Tabs Navigation */}
      <nav className="border-b border-blue-100 bg-[#CCEEFF] sticky top-20 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-lg font-bold transition-all relative ${activeTab === tab ? 'text-[#2563EB]' : 'text-slate-500 hover:text-[#1E3A8A]'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#2563EB] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <main className="py-20 bg-[#CCEEFF] min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {activeTab === 'Overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-2 gap-20"
              >
                {/* What you'll learn */}
                <div>
                  <h2 className="text-3xl font-bold text-[#2563EB] mb-10">What you'll learn</h2>
                  <div className="grid gap-6">
                    {(course.learningPoints || [
                      "Master fundamentals",
                      "Build practical projects",
                      "Understand core concepts",
                      "Apply knowledge in real-world scenarios"
                    ]).map((point, i) => (
                      <div key={i} className="flex items-start gap-4 group">
                        <div className="mt-1 w-6 h-6 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0 border border-green-100 group-hover:bg-green-100 transition-colors">
                          <CheckCircle size={14} />
                        </div>
                        <span className="text-lg text-slate-700 font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div>
                  <h2 className="text-3xl font-bold text-[#2563EB] mb-10">Prerequisites</h2>
                  <div className="grid gap-6">
                    {(course.prerequisites || [
                      "Basic computer skills",
                      "Interest in learning",
                      "Problem-solving mindset"
                    ]).map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] group-hover:scale-125 transition-transform" />
                        <span className="text-lg text-slate-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Curriculum' && (
              <motion.div
                key="curriculum"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl"
              >
                <h2 className="text-3xl font-bold text-[#1E3A8A] mb-8">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.topics?.map((topic, index) => (
                    <div key={topic._id} className="bg-white/50 backdrop-blur-sm border border-blue-100 p-6 rounded-2xl flex items-center justify-between hover:bg-white transition-all cursor-pointer group">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center font-bold">
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0F172A] text-lg">{topic.title}</h4>
                          <p className="text-slate-500 text-sm">Topic {topic.index}</p>
                        </div>
                      </div>
                      <ChevronRight className="text-slate-400 group-hover:text-[#2563EB] transition-colors" />
                    </div>
                  ))}
                  {(!course.topics || course.topics.length === 0) && (
                    <p className="text-slate-500">No topics added yet.</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'Instructor' && (
              <motion.div
                key="instructor"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="max-w-3xl bg-white/50 backdrop-blur-sm border border-blue-100 p-12 rounded-3xl flex flex-col md:flex-row gap-10 items-center"
              >
                <div className="w-40 h-40 bg-[#1E3A8A] rounded-3xl flex items-center justify-center text-white shrink-0 shadow-xl">
                  <User size={80} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-3xl font-bold text-[#1E3A8A]">{course.instructor || 'TechLearn Expert'}</h3>
                    <Award size={24} className="text-yellow-500" />
                  </div>
                  <p className="text-[#2563EB] font-bold text-lg mb-6 tracking-wide uppercase">Senior Developer & Educator</p>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Expert in software architecture and modern development practices. Dedicated to helping students bridge the gap between theory and real-world application.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
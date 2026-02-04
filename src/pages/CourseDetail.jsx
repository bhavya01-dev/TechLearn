import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();

  // In a real app, fetch course details by ID
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/courses" className="inline-flex items-center text-slate-500 hover:text-[#1E3A8A] mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Back to Courses
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="h-64 bg-slate-200 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
               <h1 className="text-4xl font-bold text-white">Python Programming</h1>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex gap-4 mb-8">
              <span className="bg-blue-100 text-[#1E3A8A] px-3 py-1 rounded-full text-sm font-semibold">Development</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">Beginner</span>
            </div>

            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">What you'll learn</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                "Master Python syntax and concepts",
                "Build real-world applications",
                "Understand Object Oriented Programming",
                "Work with modules and packages"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" size={18} />
                  <span className="text-slate-600">{item}</span>
                </div>
              ))}
            </div>

            <Link to={`/courses/${id || 'python'}/learn`}>
                <button className="w-full bg-[#1E3A8A] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#1e3a8a]/90 transition-colors">
                Start Learning
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
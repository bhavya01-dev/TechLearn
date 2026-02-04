import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Github, ChevronRight } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-12 lg:p-16 relative">
        <div className="flex justify-between items-center">
             <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-[#1E3A8A] transition-colors group">
                <div className="bg-slate-50 p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                    <ArrowLeft size={20} />
                </div>
                <span className="text-sm font-medium">Back to Home</span>
            </Link>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full mx-auto"
        >
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#0F172A] mb-3 tracking-tight">Create an account</h1>
                <p className="text-slate-500 text-lg">Start your 30-day free trial. Cancel anytime.</p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all">
                    <FaGoogle className="text-red-500 text-xl" />
                    <span className="font-semibold text-slate-600 text-sm">Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all">
                    <Github className="text-[#0F172A] w-5 h-5" />
                    <span className="font-semibold text-slate-600 text-sm">GitHub</span>
                </button>
            </div>

            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-400 font-medium">or register with email</span>
                </div>
            </div>

            <form className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                            type="text" 
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400" 
                            placeholder="John Doe" 
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                            type="email" 
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400" 
                            placeholder="name@company.com" 
                        />
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400" 
                            placeholder="Create a password" 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">Must be at least 8 characters long</p>
                </div>

                <button className="w-full bg-[#1E3A8A] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 hover:bg-[#152865] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                    Create Account <ChevronRight size={20} />
                </button>
            </form>
        </motion.div>

        <div className="text-center">
            <p className="text-slate-500 font-medium">
                Already have an account? <Link to="/login" className="text-[#2563EB] font-bold hover:underline">Log in</Link>
            </p>
        </div>
      </div>

      {/* Right Side - Visuals */}
      <div className="hidden lg:flex w-1/2 bg-[#1E3A8A] relative overflow-hidden items-center justify-center p-12">
        {/* Abstract Background - slightly different hue for Register */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#10B981] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2563EB] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-lg">
             {/* Code Card Visual */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-[#0F172A] border border-slate-700 p-6 rounded-2xl shadow-2xl mb-12 transform rotate-2 hover:rotate-0 transition-transform duration-500"
             >
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-sm">
                    <div className="text-purple-400">class <span className="text-yellow-300">Developer</span> <span className="text-slate-400">{`{`}</span></div>
                    <div className="pl-4 text-blue-400">constructor<span className="text-slate-400">() {`{`}</span></div>
                    <div className="pl-8 text-slate-300">this<span className="text-slate-400">.</span>passion <span className="text-red-400">=</span> <span className="text-green-400">true</span><span className="text-slate-400">;</span></div>
                    <div className="pl-8 text-slate-300">this<span className="text-slate-400">.</span>skills <span className="text-red-400">=</span> <span className="text-green-400">[]</span><span className="text-slate-400">;</span></div>
                    <div className="pl-4 text-slate-400">{`}`}</div>
                    <div className="pl-4 mt-2 text-blue-400">learn<span className="text-slate-400">() {`{`}</span></div>
                    <div className="pl-8 text-slate-500">// Join TechLearn to unlock full potential</div>
                    <div className="pl-8 text-slate-300">return <span className="text-green-400">"Success"</span><span className="text-slate-400">;</span></div>
                    <div className="pl-4 text-slate-400">{`}`}</div>
                    <div className="text-slate-400">{`}`}</div>
                </div>
             </motion.div>

             <div className="space-y-4">
                 <h2 className="text-4xl font-bold text-white tracking-tight">Build your future.</h2>
                 <p className="text-blue-200 text-lg">Access 100+ interactive courses and get certified. Your journey to becoming a pro starts here.</p>
             </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
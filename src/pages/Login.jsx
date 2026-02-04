import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Github, ChevronRight } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
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
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-[#0F172A] mb-3 tracking-tight">Welcome back</h1>
                        <p className="text-slate-500 text-lg">Please enter your details to sign in.</p>
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
                            <span className="px-4 bg-white text-slate-400 font-medium">or continue with email</span>
                        </div>
                    </div>

                    <form className="space-y-5">
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
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" type="checkbox" className="h-4 w-4 text-[#2563EB] focus:ring-[#2563EB] border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-slate-600">Remember me</label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-[#2563EB] hover:text-[#1E3A8A]">Forgot password?</a>
                            </div>
                        </div>

                        <button className="w-full bg-[#1E3A8A] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 hover:bg-[#152865] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                            Log In <ChevronRight size={20} />
                        </button>
                    </form>
                </motion.div>

                <div className="text-center">
                    <p className="text-slate-500 font-medium">
                        Don't have an account? <Link to="/register" className="text-[#2563EB] font-bold hover:underline">Sign up for free</Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Visuals */}
            <div className="hidden lg:flex w-1/2 bg-[#0F172A] relative overflow-hidden items-center justify-center p-12">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2563EB] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1E3A8A] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>

                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl mb-12"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex -space-x-3">
                                <div className="w-10 h-10 rounded-full border-2 border-[#1E3A8A] bg-blue-100"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-[#1E3A8A] bg-indigo-100"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-[#1E3A8A] bg-purple-100"></div>
                            </div>
                            <div>
                                <div className="flex text-yellow-400 text-sm">★★★★★</div>
                                <p className="text-xs text-blue-200">Trusted by 5,000+ students</p>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 leading-relaxed">
                            "TechLearn isn't just a platform; it's a career launchpad. The interactive labs changed how I code."
                        </h3>
                        <p className="text-blue-200 font-medium">— Amritesh, Full Stack Developer</p>
                    </motion.div>

                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold text-white tracking-tight">Master the art of coding.</h2>
                        <p className="text-blue-200 text-lg">Join a community of developers building the future, one line of code at a time.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;
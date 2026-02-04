import React from 'react';
import { motion } from 'framer-motion';
import { Bell, ArrowLeft, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoon = ({ fullPage = true, featureName = "Build" }) => {
    const headingText = "We're building something ";
    const highlightText = "LEGENDARY.";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className={`${fullPage ? 'min-h-screen bg-[#EAF5FF] pt-20' : 'py-12 bg-white rounded-2xl border border-slate-100 shadow-sm'} flex items-center justify-center p-6 relative overflow-hidden`}>
            {/* Background Decorative Blobs - Only for full page */}
            {fullPage && (
                <>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 blur-[120px] rounded-full pointer-events-none -z-0"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/30 blur-[120px] rounded-full pointer-events-none -z-0"></div>
                </>
            )}

            <div className="max-w-2xl w-full text-center z-10">
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold text-[#1E3A8A] mb-6 tracking-tighter leading-tight flex justify-center flex-wrap"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {headingText.split("").map((char, index) => (
                        <motion.span key={index} variants={letterVariants}>
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                    <span className="text-[#2563EB] italic flex">
                        {highlightText.split("").map((char, index) => (
                            <motion.span key={index} variants={letterVariants}>
                                {char}
                            </motion.span>
                        ))}
                    </span>
                </motion.h1>

                <motion.p
                    className="text-xl text-[#334155] mb-12 leading-relaxed max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    The <span className="font-bold text-[#1E3A8A]">{featureName}</span> section is currently under heavy construction by our top-tier engineering robots.
                    Stay tuned for a workspace that'll change how you code forever.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <div className="relative w-full max-w-sm">
                        <input
                            type="email"
                            placeholder="Enter your email for early access"
                            className="w-full px-6 py-4 bg-white border border-blue-100 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all pr-32"
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-[#1E3A8A] text-white px-4 rounded-lg font-bold hover:bg-[#152865] transition-colors text-sm flex items-center gap-2">
                            <Bell size={14} /> Notify
                        </button>
                    </div>

                    <Link to="/">
                        <button className="flex items-center gap-2 text-[#2563EB] font-bold hover:text-[#1E3A8A] transition-colors p-4">
                            <ArrowLeft size={20} /> Back to safety
                        </button>
                    </Link>
                </motion.div>

                {/* Progress bar mock */}
                <motion.div
                    className="mt-20 max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        <span>Overall Construction</span>
                        <span>85%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#2563EB] to-[#10B981]"
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ComingSoon;

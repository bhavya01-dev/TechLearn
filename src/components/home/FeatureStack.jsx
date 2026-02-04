import React from 'react';
import { motion } from 'framer-motion';
import { Play, Check, ChevronRight, RefreshCw, Terminal, Award } from 'lucide-react';
import { FaJava, FaPython, FaJs } from 'react-icons/fa';

// Import university logos
import uhLogo from '../../assets/university/uh.png';
import vjitLogo from '../../assets/university/vjit.png';
import vnrvjietLogo from '../../assets/university/vnrvjiet.png';
import muLogo from '../../assets/university/mu.png';

const SectionContainer = ({ children, className = "" }) => (
  <section className={`py-24 md:py-32 px-6 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);



const FeatureHeading = ({ title, highlight }) => (
  <h2 className="text-4xl md:text-5xl font-extrabold italic text-[#1E3A8A] mb-8 tracking-tighter">
    {title}<span className="text-[#2563EB]">{highlight}</span>
  </h2>
);



const FeatureDescription = ({ children }) => (
  <div className="text-[#334155] text-lg leading-relaxed md:text-xl space-y-6 max-w-lg">
    {children}
  </div>
);

const TechPrep = () => {
  const universities = [
    { name: 'University of Hyderabad', logo: uhLogo },
    { name: 'Vidya Jyothi', logo: vjitLogo },
    { name: 'VNR VJIET', logo: vnrvjietLogo },
    { name: 'Mahindra University', logo: muLogo },
  ];

  return (
    <SectionContainer>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <FeatureHeading title="tech" highlight="PREP" />
          <FeatureDescription>
            <p className="font-semibold text-2xl mb-4 text-[#0F172A]">Already learned with us? Time to prove it.</p>
            <p>
              Click your college logo below and start your assessment now. Because practice turns preparation into success.
            </p>
          </FeatureDescription>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {universities.map((uni, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer w-full">
              <div className="w-full aspect-square bg-white shadow-sm rounded-2xl flex items-center justify-center p-6 border border-slate-100 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                <img src={uni.logo} alt={uni.name} className="max-w-full max-h-full object-contain" />
              </div>
              <span className="text-[10px] text-center font-bold text-slate-400 group-hover:text-[#1E3A8A] uppercase tracking-wider">{uni.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  );
};

const CodeWorkout = () => (
  <SectionContainer>
    <div className="grid md:grid-cols-2 gap-16 items-start">
      <motion.div
        className="order-1 md:order-1"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <FeatureHeading title="code" highlight=" WORKOUT" />
        <FeatureDescription>
          <p className="text-xl">
            Turn syntax into muscle memory — minus the sweat.
          </p>
          <p>
            Challenge yourself with our comprehensive coding exercises designed to strengthen your programming fundamentals.
          </p>
          <ul className="space-y-3 mt-6">
            {[
              "Progressive difficulty levels from beginner to advanced",
              "Interactive coding challenges with instant feedback",
              "Track your progress and identify improvement areas",
              "Real-world problem scenarios"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#2563EB] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button className="mt-8 bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            Start WORKOUT <ChevronRight size={20} />
          </button>
        </FeatureDescription>
      </motion.div>

      <motion.div
        className="order-2 md:order-2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#2563EB]/20"></div>
          {/* Workout Card Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800">MySQL Database</h3>
              <p className="text-sm text-slate-500">Practice your coding skills</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">Beginner</span>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">10 Exercises</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[#2563EB] font-bold text-lg">0%</span>
              <p className="text-[10px] text-slate-400 uppercase">Complete</p>
            </div>
          </div>

          {/* Workout Items */}
          <div className="space-y-3">
            {[
              { title: "Hello World", time: "5 min", xp: "10 XP" },
              { title: "Variables & Data Types", time: "10 min", xp: "15 XP" },
              { title: "Control Structures", time: "15 min", xp: "20 XP" },
            ].map((task, i) => (
              <div key={i} className="group bg-slate-50 hover:bg-[#E0F2FE] p-4 rounded-xl border border-slate-100 transition-colors cursor-pointer flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                  <Play size={16} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 text-sm group-hover:text-[#1E3A8A]">{task.title}</h4>
                  <div className="flex gap-3 text-xs text-slate-400 mt-1">
                    <span>Easy</span>
                    <span>{task.time}</span>
                    <span>{task.xp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </SectionContainer>
);

const CodeLab = () => (
  <SectionContainer>
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <FeatureHeading title="code" highlight=" LAB" />
        <FeatureDescription>
          <p className="text-2xl font-medium text-[#1E3A8A]">Your browser is your IDE now.</p>
          <p>
            Experience seamless coding with our powerful online compiler. No installations, no setup hassles.
          </p>
          <ul className="space-y-4 mt-6">
            <li className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center z-10"><FaJava className="text-red-500" /></div>
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center z-20"><FaPython className="text-blue-500" /></div>
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center z-30"><FaJs className="text-yellow-500" /></div>
              </div>
              <span className="font-medium">Multi-language support (C, C++, Java, Python, JS)</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#2563EB] rounded-full" />
              <span>Real-time code compilation and execution</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#2563EB] rounded-full" />
              <span>Syntax highlighting and error detection</span>
            </li>
          </ul>
          <button className="mt-8 bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            Start LAB <ChevronRight size={20} />
          </button>
        </FeatureDescription>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* IDE Mockup */}
        <div className="bg-[#1e293b] rounded-xl shadow-2xl overflow-hidden border border-slate-700 font-mono text-xs md:text-sm">
          {/* Toolbar */}
          <div className="bg-[#0f172a] p-3 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-2">
              <FaPython className="text-blue-400" />
              <span className="text-slate-300 font-semibold">main.py</span>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded"><RefreshCw size={14} /></button>
              <button className="flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors"><Play size={10} /> Run</button>
            </div>
          </div>
          {/* Editor Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 h-[300px]">
            <div className="bg-[#1e293b] p-4 text-slate-300 border-r border-slate-700">
              <div className="flex gap-4">
                <div className="text-slate-600 select-none flex flex-col text-right">
                  <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
                </div>
                <div className="whitespace-pre">
                  <span className="text-purple-400">def</span> <span className="text-blue-400">fibonacci</span>(n):{'\n'}
                  {'  '}if n &lt;= 0:{'\n'}
                  {'    '}<span className="text-purple-400">return</span> []{'\n'}
                  {'  '}elif n == 1:{'\n'}
                  {'    '}<span className="text-purple-400">return</span> [0]{'\n'}
                  {'  '}else:{'\n'}
                  {'    '}seq = [0, 1]{'\n'}
                  {'    '}...
                </div>
              </div>
            </div>
            {/* Output Panel */}
            <div className="bg-[#0f172a] p-4 text-slate-300">
              <div className="text-slate-500 mb-2 uppercase text-[10px] tracking-wider font-bold">Output</div>
              <div className="text-green-400 font-bold">$ python3 main.py</div>
              <div className="mt-2 text-slate-300">
                [0, 1, 1, 2, 3, 5, 8, 13]
              </div>
              <div className="mt-4 text-blue-400 text-[10px]">
                Process finished with exit code 0
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </SectionContainer>
);

const CodeMaster = () => (
  <SectionContainer>
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <FeatureHeading title="code" highlight=" MASTER" />
        <FeatureDescription>
          <p className="text-xl">Prove Your Expertise.</p>
          <p>
            Validate your programming skills with industry-recognized certifications that demonstrate your technical proficiency.
          </p>
          <ul className="space-y-3 mt-6">
            {[
              "Industry-recognized certification programs",
              "Comprehensive skill assessments",
              "Digital certificates with verification codes",
              "Professional portfolio enhancement"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Check size={12} strokeWidth={4} />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button className="mt-8 bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            Start MASTER <ChevronRight size={20} />
          </button>
        </FeatureDescription>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: -5, y: 20 }}
        whileInView={{ opacity: 1, rotate: 2, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring" }}
        className="relative"
      >
        {/* Decorative Backdrop */}
        <div className="absolute inset-0 bg-blue-900 rounded-xl transform translate-x-4 translate-y-4 -rotate-2 opacity-20"></div>

        {/* Certificate Mockup */}
        <div className="bg-white p-2 shadow-2xl rounded-xl border border-slate-200 relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
          <div className="border-4 border-[#1E3A8A] border-double p-8 md:p-12 text-center h-full min-h-[300px] flex flex-col justify-center bg-[#F8FAFC]">
            <h4 className="font-serif text-3xl md:text-4xl text-[#1E3A8A] mb-2 tracking-wide uppercase">Certificate</h4>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-8">of completion</p>

            <p className="text-slate-600 italic font-serif mb-2">Proudly presented to</p>
            <div className="border-b border-slate-300 w-3/4 mx-auto mb-6"></div>

            <p className="text-xs text-slate-500 mb-1">For completing Data Structures & Algorithms</p>

            <div className="mt-8 flex justify-between items-end px-4">
              <div className="text-left">
                <div className="text-[8px] text-slate-400 uppercase">Certified On</div>
                <div className="w-20 h-px bg-slate-300 mt-1"></div>
              </div>
              <Award size={40} className="text-[#2563EB]" />
              <div className="text-right">
                <div className="text-[8px] text-slate-400 uppercase">Certificate No</div>
                <div className="w-20 h-px bg-slate-300 mt-1"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </SectionContainer>
);

const FeatureStack = () => {
  return (
    <div className="space-y-12">
      <TechPrep />
      <CodeWorkout />
      <CodeLab />
      <CodeMaster />
    </div>
  );
};

export default FeatureStack;
import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, X } from 'lucide-react';

const topics = [
  { id: 1, title: 'Introduction To Python' },
  { id: 2, title: 'General Functions' },
  { id: 3, title: 'Operators' },
  { id: 4, title: 'Control Statements' },
  { id: 5, title: 'Data Types and Methods' },
  { id: 6, title: 'Types of Loops' },
  { id: 7, title: 'Functions' },
  { id: 8, title: 'Lists and Tuples' },
];

const CodeBlock = ({ children }) => (
  <div className="bg-[#282C34] text-[#ABB2BF] p-6 rounded-lg font-mono text-sm leading-relaxed shadow-lg mb-6 overflow-x-auto border border-slate-700">
    {children}
  </div>
);

const CourseTopic = () => {
  const [activeTopicId, setActiveTopicId] = useState(1);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setSidebarOpen(true);
    }
  }, []);

  const handleContentClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#D7EEFF] overflow-hidden pt-16 md:pt-20">

      {/* Mobile Sidebar Toggle (moved into content header) */}

      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <button
          className="md:hidden fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[1px]"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 md:sticky md:top-20 z-50 h-screen md:h-[calc(100dvh-80px)] overflow-hidden bg-[#D7EEFF] border-r border-blue-100 flex flex-col transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0 w-[85vw] max-w-sm md:w-80' : '-translate-x-full md:translate-x-0 md:w-20'}
        `}
      >
        <div className={`shrink-0 border-b border-blue-200/50 flex items-center ${isSidebarOpen ? 'p-6 gap-2' : 'p-4 justify-center'}`}>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-[#1E3A8A] hover:bg-blue-100 p-1 rounded-full transition-colors"
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
          </button>
          {isSidebarOpen && (
            <h2 className="text-xl font-bold text-[#1E3A8A]">Course Topics</h2>
          )}
        </div>

        <div
          className={`flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y custom-scrollbar ${isSidebarOpen ? 'p-4 space-y-3 pb-16' : 'p-3 space-y-2 pb-12'}`}
        >
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                setActiveTopicId(topic.id);
                if (typeof window !== 'undefined' && window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
              className={`w-full text-left rounded-xl transition-all duration-200 flex items-center gap-3 font-medium text-sm md:text-base ${isSidebarOpen ? 'p-4' : 'p-3 justify-center'} ${activeTopicId === topic.id
                ? 'bg-[#BFDBFE] text-[#1E3A8A] shadow-sm border border-blue-200'
                : 'bg-[#EAF5FF] text-slate-600 hover:bg-[#DBEAFE] hover:text-[#1E3A8A]'
                }`}
            >
              <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${activeTopicId === topic.id ? 'bg-[#1E3A8A] text-white' : 'text-slate-400'}`}>
                {topic.id}
              </span>
              {isSidebarOpen && topic.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 md:p-12 relative w-full" onClick={handleContentClick}>
        <div className="max-w-5xl mx-auto pb-20">
          <div className="bg-[#EAF5FF] border border-blue-100 rounded-2xl md:rounded-3xl shadow-sm p-6 sm:p-8 md:p-12">

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSidebarOpen(true);
            }}
            className="flex items-center gap-4 mb-6 md:mb-10 md:hidden text-left"
            aria-label="Open course topics"
          >
            <span className="w-9 h-9 rounded-2xl border border-blue-200 bg-[#DCEEFF] text-[#2563EB] flex items-center justify-center shadow-sm">
              <BookOpen size={20} />
            </span>
            <span className="text-lg md:text-xl font-medium text-slate-600">Course Topics</span>
          </button>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#0047FF] mb-8 md:mb-12 tracking-tight">
            Introduction To Python
          </h1>

          <div className="space-y-8 md:space-y-12">
            {/* History Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#4285F4] mb-4">History</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Python is a high-level, interpreted, interactive, and object-oriented scripting language. It was developed by Guido van Rossum in the late 1980s and early 1990s at the National Research Institute for Mathematics and Computer Science in the Netherlands. Python is derived from several languages like C, C++, SmallTalk, Algol-68, and other scripting languages. It is general-purpose, versatile, concise, easy to read, and can be used in web development, software development, and scientific applications.
              </p>
            </section>

            {/* Features Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#4285F4] mb-4">Features</h2>
              <ul className="space-y-3 text-slate-600 text-lg list-disc pl-5 marker:text-[#4285F4]">
                <li>Easy to read, learn, and maintain.</li>
                <li>Comes with a standard library that is portable and cross-platform compatible.</li>
                <li>Strong support for modules and packages.</li>
              </ul>
            </section>

            {/* Code Examples */}
            <section className="space-y-6 mt-8">
              <CodeBlock>
                <div className="text-slate-500 mb-2 italic"># Example: test.py</div>
                <div>
                  <span className="text-[#E06C75]">print</span>(<span className="text-[#98C379]">'Hello World!'</span>)
                </div>
              </CodeBlock>

              <CodeBlock>
                <div>
                  <span className="text-[#61AFEF]">&gt;&gt;&gt;</span> <span className="text-[#C678DD]">import</span> test
                </div>
                <div className="text-slate-500 italic"># Output: Hello World!</div>
              </CodeBlock>

              <CodeBlock>
                <div className="text-slate-500 mb-2 italic"># Example: test2.py</div>
                <div>
                  <span className="text-[#E06C75]">print</span>(<span className="text-[#98C379]">'Program started'</span>)
                </div>
                <div>
                  x = <span className="text-[#D19A66]">10</span>
                </div>
                <div>
                  y = <span className="text-[#D19A66]">20</span>
                </div>
                <div>
                  z = x + y
                </div>
                <div>
                  <span className="text-[#E06C75]">print</span>(x, y, z)
                </div>
                <div>
                  <span className="text-[#E06C75]">print</span>(<span className="text-[#98C379]">'Program ends'</span>)
                </div>
              </CodeBlock>
            </section>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseTopic;

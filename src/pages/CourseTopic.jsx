import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CodePanel = ({ children, subtitle }) => (
  <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#1f2a44] to-[#2c3a55] shadow-xl border border-slate-700/60 mb-6">
    {subtitle && (
      <div className="px-6 pt-5 pb-2 text-slate-300/80 text-sm font-semibold italic">
        {subtitle}
      </div>
    )}
    <div className="px-6 pb-6 pt-4 font-mono text-sm sm:text-base leading-relaxed text-[#c7d2fe] overflow-x-auto">
      {children}
    </div>
  </div>
);

const normalizeNotesBlocks = (notes) => {
  if (!notes) return [];
  if (typeof notes === 'string') {
    return [{ type: 'markdown', content: notes.replace(/\r\n/g, '\n') }];
  }

  if (Array.isArray(notes)) {
    return notes
      .map((entry) => {
        if (!entry) return null;
        if (typeof entry === 'string') return { type: 'markdown', content: entry.replace(/\r\n/g, '\n') };
        if (typeof entry === 'object') {
          if (entry.type) return entry;
          if (entry.code) return { type: 'code', content: entry.code, language: entry.language, title: entry.title };
          if (entry.markdown || entry.text || entry.content) {
            const raw = entry.markdown || entry.text || entry.content;
            return { type: 'markdown', content: typeof raw === 'string' ? raw.replace(/\r\n/g, '\n') : raw };
          }
        }
        return null;
      })
      .filter(Boolean);
  }

  if (typeof notes === 'object') {
    if (notes.blocks && Array.isArray(notes.blocks)) return normalizeNotesBlocks(notes.blocks);
    if (notes.markdown || notes.text || notes.content) {
      const raw = notes.markdown || notes.text || notes.content;
      return [{ type: 'markdown', content: typeof raw === 'string' ? raw.replace(/\r\n/g, '\n') : raw }];
    }
    if (notes.code) return [{ type: 'code', content: notes.code, language: notes.language, title: notes.title }];
  }

  return [{ type: 'markdown', content: String(notes).replace(/\r\n/g, '\n') }];
};

const getTopicNotes = (topic) => (
  topic?.notes ||
  topic?.content ||
  topic?.body ||
  topic?.description ||
  topic?.markdown ||
  ''
);

const normalizeFirstHeading = (markdown, courseTitle, topicTitle) => {
  if (!markdown) return markdown;
  const lines = markdown.split('\n');
  const firstLine = lines[0]?.trim() || '';
  if (firstLine.startsWith('#')) {
    const headingText = firstLine.replace(/^#+\s*/, '').trim().toLowerCase();
    if (courseTitle && headingText === courseTitle.trim().toLowerCase()) {
      const remaining = lines.slice(1).join('\n').replace(/^\s*\n/, '');
      return topicTitle ? `# ${topicTitle.trim()}\n\n${remaining}`.trim() : remaining;
    }
    if (topicTitle && headingText !== topicTitle.trim().toLowerCase()) {
      lines[0] = `# ${topicTitle.trim()}`;
      return lines.join('\n');
    }
    return markdown;
  }
  if (topicTitle) {
    return `# ${topicTitle.trim()}\n\n${markdown}`.trim();
  }
  return markdown;
};

const CourseTopic = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        if (res.success) {
          setCourse(res.data);
          if (res.data.topics?.length > 0) {
            setActiveTopicId(res.data.topics[0].topicId || res.data.topics[0]._id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch course', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#D7EEFF] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8A]"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#D7EEFF] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Course not found</h2>
        <Link to="/learn/courses" className="text-[#2563EB] hover:underline">Back to Courses</Link>
      </div>
    );
  }

  const activeTopic = course.topics?.find(t => (t.topicId || t._id) === activeTopicId);
  const activeNotesBlocks = normalizeNotesBlocks(getTopicNotes(activeTopic)).map((block, index) => {
    if (block.type !== 'markdown' || typeof block.content !== 'string') return block;
    if (index !== 0) return block;
    return {
      ...block,
      content: normalizeFirstHeading(block.content, course?.title, activeTopic?.title)
    };
  });
  const shouldShowTitle = false;

  return (
    <div className="flex h-screen bg-[#D7EEFF] overflow-hidden pt-16 md:pt-20">

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
        <div className={`shrink-0 border-b border-blue-200/70 ${isSidebarOpen ? 'px-6 py-5' : 'p-4'}`}>
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <Link to="/learn/courses" className="text-[#1E3A8A] hover:text-[#2563EB] transition-colors">
                <ArrowLeft size={22} />
              </Link>
              <h2 className="text-2xl font-extrabold text-[#1E3A8A] tracking-tight">Course Topics</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-auto text-[#1E3A8A] hover:bg-blue-100 p-1 rounded-full transition-colors"
                aria-label="Close sidebar"
              >
                <ChevronLeft size={22} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-[#1E3A8A] hover:bg-blue-100 p-1 rounded-full transition-colors"
              aria-label="Open sidebar"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        <div
          className={`flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y custom-scrollbar ${isSidebarOpen ? 'p-4 space-y-4 pb-16' : 'p-3 space-y-2 pb-12'}`}
        >
          {course.topics?.map((topic, index) => (
            <button
              key={topic.topicId || topic._id}
              onClick={() => {
                setActiveTopicId(topic.topicId || topic._id);
                if (typeof window !== 'undefined' && window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
              className={`w-full text-left rounded-2xl transition-all duration-200 flex items-center gap-3 font-semibold text-sm md:text-base ${isSidebarOpen ? 'p-4' : 'p-3 justify-center'} ${activeTopicId === (topic.topicId || topic._id)
                ? 'bg-[#CFE2FF] text-[#1E3A8A] shadow-sm border border-blue-200'
                : 'bg-[#EAF5FF] text-slate-600 hover:bg-[#DDEEFF] hover:text-[#1E3A8A]'
                }`}
            >
              <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${activeTopicId === (topic.topicId || topic._id) ? 'bg-[#1E3A8A] text-white' : 'bg-[#E6F0FF] text-slate-500'}`}>
                {index + 1}
              </span>
              {isSidebarOpen && topic.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 md:p-12 relative w-full" onClick={handleContentClick}>
        <div className="max-w-5xl mx-auto pb-20">
          <div className="bg-[#EAF5FF] border border-blue-100 rounded-3xl shadow-sm p-8 sm:p-10 md:p-14 font-academic">

            <div className="flex items-center justify-start mb-6 md:mb-10">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSidebarOpen(true);
                }}
                className="flex items-center gap-4 md:hidden text-left"
                aria-label="Open course topics"
              >
                <span className="w-9 h-9 rounded-2xl border border-blue-200 bg-[#DCEEFF] text-[#2563EB] flex items-center justify-center shadow-sm">
                  <BookOpen size={20} />
                </span>
                <span className="text-lg md:text-xl font-medium text-slate-600">Topics</span>
              </button>
            </div>

            {activeTopic ? (
              <>
                {shouldShowTitle && (
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B4DFF] mb-6 md:mb-8 tracking-[0.04em] font-heading">
                    {activeTopic.title}
                  </h1>
                )}

                <div className="space-y-5 md:space-y-8 text-slate-600 text-sm md:text-base leading-relaxed">
                  {activeNotesBlocks.length > 0 ? (
                    activeNotesBlocks.map((block, index) => {
                      if (block.type === 'code') {
                        return (
                          <CodePanel key={`${block.title || 'code'}-${index}`} subtitle={block.title}>
                            <pre className="whitespace-pre-wrap">{block.content}</pre>
                          </CodePanel>
                        );
                      }
                      return (
                        <div key={`md-${index}`} className="max-w-none space-y-6 text-slate-600">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1({ children }) {
                                return (
                                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B4DFF] tracking-[0.04em] font-heading">
                                    {children}
                                  </h1>
                                );
                              },
                              h2({ children }) {
                                return (
                                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#3572FF] mt-5 tracking-[0.02em] font-heading">
                                    {children}
                                  </h2>
                                );
                              },
                              h3({ children }) {
                                return (
                                  <h3 className="text-base sm:text-lg font-semibold text-[#3572FF] mt-4 tracking-[0.02em] font-heading">
                                    {children}
                                  </h3>
                                );
                              },
                              p({ children }) {
                                return <p className="text-sm md:text-base leading-relaxed text-slate-600 font-sans">{children}</p>;
                              },
                              a({ href, children }) {
                                return (
                                  <a href={href} className="text-[#2563EB] font-semibold hover:underline">
                                    {children}
                                  </a>
                                );
                              },
                              blockquote({ children }) {
                                return (
                                  <blockquote className="border-l-4 border-blue-200 pl-4 py-2 text-slate-600 italic bg-blue-50/50 rounded-r-lg">
                                    {children}
                                  </blockquote>
                                );
                              },
                              ul({ children }) {
                                return (
                                  <ul className="list-disc pl-6 space-y-2 marker:text-[#3B82F6] text-sm md:text-base text-slate-600 font-sans">
                                    {children}
                                  </ul>
                                );
                              },
                              ol({ children }) {
                                return (
                                  <ol className="list-decimal pl-6 space-y-2 marker:text-[#3B82F6] text-sm md:text-base text-slate-600 font-sans">
                                    {children}
                                  </ol>
                                );
                              },
                              li({ children }) {
                                return <li className="pl-1">{children}</li>;
                              },
                              hr() {
                                return <hr className="border-blue-200/70 my-6" />;
                              },
                              table({ children }) {
                                return (
                                  <div className="overflow-x-auto rounded-xl border border-blue-100 bg-white/60 shadow-sm">
                                    <table className="w-full text-left text-sm md:text-base">
                                      {children}
                                    </table>
                                  </div>
                                );
                              },
                              thead({ children }) {
                                return <thead className="bg-blue-50 text-slate-700">{children}</thead>;
                              },
                              tbody({ children }) {
                                return <tbody className="divide-y divide-blue-100">{children}</tbody>;
                              },
                              tr({ children }) {
                                return <tr className="align-top">{children}</tr>;
                              },
                              th({ children }) {
                                return <th className="px-4 py-3 font-semibold">{children}</th>;
                              },
                              td({ children }) {
                                return <td className="px-4 py-3 text-slate-600">{children}</td>;
                              },
                              strong({ children }) {
                                return <strong className="text-slate-800 font-semibold">{children}</strong>;
                              },
                              code({ inline, className, children }) {
                                if (inline) {
                                  return (
                                    <code className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-mono text-sm">
                                      {children}
                                    </code>
                                  );
                                }
                                const language = className?.replace('language-', '') || '';
                                return (
                                  <CodePanel subtitle={language ? language.toUpperCase() : undefined}>
                                    <pre className="whitespace-pre-wrap">{children}</pre>
                                  </CodePanel>
                                );
                              },
                              pre({ children }) {
                                return <>{children}</>;
                              }
                            }}
                          >
                            {block.content}
                          </ReactMarkdown>
                        </div>
                      );
                    })
                  ) : (
                    <p>No content available for this topic.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-400">Select a topic to start learning</h2>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseTopic;

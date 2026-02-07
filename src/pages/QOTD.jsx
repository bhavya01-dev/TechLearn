import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import QuestionPanel from '../components/qotd/QuestionPanel';
import CodeEditor from '../components/qotd/CodeEditor';
import Leaderboard from '../components/qotd/Leaderboard';
import Timer from '../components/qotd/Timer';
import StreakBadge from '../components/qotd/StreakBadge';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Home } from 'lucide-react';
import './QOTD.css';
import React from 'react';
import './QOTD.css';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="scene">
        {/* 4 mini cubes in 2x2 formation */}
        <div className="main-cube">
          {/* Top-left cube */}
          <div className="mini-cube pos-1">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
          
          {/* Top-right cube */}
          <div className="mini-cube pos-2">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
          
          {/* Bottom-left cube */}
          <div className="mini-cube pos-3">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
          
          {/* Bottom-right cube */}
          <div className="mini-cube pos-4">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
        
        {/* Flat diamond shadow */}
        <div className="shadow">
          <div className="shadow-diamond"></div>
        </div>
      </div>
    </div>
  );
};

const QOTD = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('python');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [runsRemaining, setRunsRemaining] = useState(2);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isPaidUser, setIsPaidUser] = useState(false);
    const [solutionText, setSolutionText] = useState('');
    const [revealedHints, setRevealedHints] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [streak, setStreak] = useState(5);
    const [showNextButton, setShowNextButton] = useState(false);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const question = await api.getTodayQuestion();
                setCurrentQuestion(question);
                setCode(question?.starterCode?.[selectedLanguage] || '');
                if (question?.userProgress) {
                    setRunsRemaining(question.userProgress.runsRemaining ?? 2);
                    setHasSubmitted(question.userProgress.hasSubmitted ?? false);
                    setIsPaidUser(question.userProgress.isPaidUser ?? false);
                }
            } catch (error) {
                console.error('Failed to fetch today\'s question:', error);
                setOutput('❌ Could not load today\'s question. Please try again later.');
            }
        };
        fetchQuestion();
    }, []);

    useEffect(() => {
        if (currentQuestion) {
            // MongoDB Map might come back as an object
            const starter = currentQuestion.starterCode;
            setCode(starter?.[selectedLanguage] || '');
        }
    }, [selectedLanguage, currentQuestion]);

    useEffect(() => {
        const fetchSolution = async () => {
            if (!isPaidUser || activeTab !== 'solutions' || !currentQuestion?._id) return;
            try {
                const result = await api.get(`/v1/qotd/solution/${currentQuestion._id}`);
                setSolutionText(result?.solution || 'Solution not available.');
            } catch (error) {
                setSolutionText(error.message || 'Solution not available.');
            }
        };
        fetchSolution();
    }, [activeTab, isPaidUser, currentQuestion?._id]);

    const handleRun = async () => {
        if (runsRemaining <= 0) {
            setOutput('❌ You have no runs remaining for today. Try again tomorrow!');
            return;
        }

        setIsRunning(true);
        setOutput('⏳ Compiling and running your code...');

        try {
            const result = await api.submitSolution(currentQuestion._id, code, selectedLanguage, false);
            if (typeof result.runsRemaining === 'number') {
                setRunsRemaining(result.runsRemaining);
            } else {
                setRunsRemaining(prev => Math.max(0, prev - 1));
            }
            if (typeof result.hasSubmitted === 'boolean') {
                setHasSubmitted(result.hasSubmitted);
            }

            let outputMsg = result.status === 'Accepted'
                ? '✅ Test Case Passed!\n\n'
                : `❌ ${result.status}\n\n`;

            if (result.stdout) outputMsg += `📜 Output:\n${result.stdout}\n`;
            outputMsg += `⏱️ Runtime: ${result.runtime}s\n`;
            outputMsg += `💾 Memory: ${result.memory} KB\n`;
            outputMsg += '━━━━━━━━━━━━━━━━━━━━\n';

            setOutput(outputMsg);
        } catch (error) {
            setOutput(`❌ ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const revealHint = (index) => {
        if (!revealedHints.includes(index)) {
            setRevealedHints([...revealedHints, index]);
        }
    };

    const handleSubmit = async () => {
        if (hasSubmitted) {
            setOutput('❌ You have already submitted today. Come back tomorrow!');
            return;
        }

        setIsRunning(true);
        setOutput('📤 Submitting your solution...');

        try {
            const result = await api.submitSolution(currentQuestion._id, code, selectedLanguage, true);

            if (result.status === 'Accepted') {
                const timeStr = `${Math.floor(elapsedTime / 60)}m ${elapsedTime % 60}s`;
                setOutput(
                    `🎉 Submission Accepted!\n\n` +
                    `━━━━━━━━━━━━━━━━━━━━\n` +
                    `⏱️ Time Taken: ${timeStr}\n` +
                    `🚀 Runtime: ${result.runtime}s\n` +
                    `💾 Memory: ${result.memory} KB\n` +
                    `━━━━━━━━━━━━━━━━━━━━\n\n` +
                    `🔥 Streak: ${streak + 1} days!\n\n` +
                    `Great job! Keep it up! 🚀`
                );
                setHasSubmitted(true);
                setStreak(prev => prev + 1);
            } else {
                let outputMsg = `❌ Submission Rejected: ${result.status}\n\n`;
                if (result.stdout) outputMsg += `📜 Output:\n${result.stdout}\n`;
                outputMsg += '\n💡 Tip: Check your logic and try again!';
                setOutput(outputMsg);
            }
            if (typeof result.runsRemaining === 'number') {
                setRunsRemaining(result.runsRemaining);
            }
            if (typeof result.hasSubmitted === 'boolean') {
                setHasSubmitted(result.hasSubmitted);
            }
        } catch (error) {
            setOutput(`❌ ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    if (!currentQuestion) {
        return (
            <div className="qotd-loading">
                <div className="loader-stagger">
                    <span></span><span></span><span></span>
                </div>
            </div>
        );
    }

    return (
        <div className={`qotd-container ${isDarkMode ? 'dark' : 'light'}`}>
            {/* Header Bar */}
            <div className="qotd-header">
                <div className="qotd-header-left">
                    <Link to="/" className="home-btn" title="Back to Home">
                        <Home size={20} />
                    </Link>
                    <h1 className="qotd-title">
                        <span className="qotd-icon">🔥</span>
                        Question of the Day
                    </h1>
                    <span className={`difficulty-badge ${currentQuestion.difficulty.toLowerCase()}`}>
                        {currentQuestion.difficulty}
                    </span>
                </div>
                <div className="qotd-header-right">
                    <Timer onTimeUpdate={setElapsedTime} />
                    <div className="runs-indicator">
                        <span className="runs-label">Runs:</span>
                        <span className="runs-count">{runsRemaining}/{isPaidUser ? 4 : 2}</span>
                    </div>
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>

            {/* Main Split Layout */}
            <div className="qotd-main">
                {/* Left Panel - Problem Description */}
                <div className="qotd-left-panel">
                    <div className="panel-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            📝 Description
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'hints' ? 'active' : ''}`}
                            onClick={() => setActiveTab('hints')}
                        >
                            💡 Hints
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'solutions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('solutions')}
                            disabled={!isPaidUser}
                        >
                            📖 Solutions {!isPaidUser && '🔒'}
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
                            onClick={() => setActiveTab('leaderboard')}
                        >
                            🏆 Leaderboard
                        </button>
                    </div>

                    <div className="panel-content custom-scrollbar">
                        {activeTab === 'description' && (
                            <>
                                <QuestionPanel question={currentQuestion} />
                                <div className="streak-section">
                                    <StreakBadge streak={streak} isPaidUser={isPaidUser} />
                                </div>
                            </>
                        )}
                        {activeTab === 'hints' && (
                            <div className="hints-panel">
                                <h3>💡 Hints</h3>
                                {currentQuestion.hints && currentQuestion.hints.length > 0 ? (
                                    <div className="hints-list">
                                        {currentQuestion.hints.map((hint, index) => (
                                            <div key={index} className="hint-item">
                                                {revealedHints.includes(index) ? (
                                                    <div className="hint-revealed">
                                                        <span className="hint-number">Hint {index + 1}:</span>
                                                        <p>{hint}</p>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="hint-reveal-btn"
                                                        onClick={() => revealHint(index)}
                                                    >
                                                        <span className="hint-icon">🔮</span>
                                                        Reveal Hint {index + 1}
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-hints">No hints available for this question.</p>
                                )}
                            </div>
                        )}
                        {activeTab === 'solutions' && (
                            <div className="solutions-panel">
                                {isPaidUser ? (
                                    <div className="solution-content">
                                        <h3>📖 Official Solution</h3>
                                        <div className="solution-explanation">
                                            <p>{solutionText || 'Loading solution...'}</p>
                                        </div>
                                        <h4>Example Implementation:</h4>
                                        <pre><code>{currentQuestion.starterCode?.python}</code></pre>
                                    </div>
                                ) : (
                                    <div className="locked-content">
                                        <span className="lock-icon">🔒</span>
                                        <h3>Solution Locked</h3>
                                        <p>Upgrade to Premium to view the official solution.</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === 'leaderboard' && (
                            <Leaderboard difficulty={currentQuestion.difficulty} />
                        )}
                    </div>
                </div>

                {/* Right Panel - Code Editor */}
                <div className="qotd-right-panel">
                    <div className="editor-header">
                        <select
                            className="language-select"
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                        >
                            <option value="python">🐍 Python</option>
                            <option value="java">☕ Java</option>
                        </select>
                        <div className="editor-actions">
                            <button
                                className="btn-run"
                                onClick={handleRun}
                                disabled={isRunning || runsRemaining <= 0}
                            >
                                {isRunning ? '⏳ Running...' : '▶ Run'}
                            </button>
                            <button
                                className="btn-submit"
                                onClick={handleSubmit}
                                disabled={hasSubmitted}
                            >
                                {hasSubmitted ? '✓ Submitted' : '📤 Submit'}
                            </button>
                        </div>
                    </div>

                    <div className="editor-container">
                        <CodeEditor
                            code={code}
                            setCode={setCode}
                            language={selectedLanguage}
                            isDarkMode={isDarkMode}
                        />
                    </div>

                    {/* Console Output */}
                    <div className="console-container">
                        <div className="console-header">
                            <span>🖥️ Console</span>
                        </div>
                        <div className="console-output custom-scrollbar">
                            <pre>{output || 'Click "Run" to execute your code...'}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QOTD;

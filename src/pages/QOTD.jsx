import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { questions, getTodaysQuestion, executeCode } from '../data/questionBank';
import QuestionPanel from '../components/qotd/QuestionPanel';
import CodeEditor from '../components/qotd/CodeEditor';
import Leaderboard from '../components/qotd/Leaderboard';
import Timer from '../components/qotd/Timer';
import StreakBadge from '../components/qotd/StreakBadge';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import './QOTD.css';

const QOTD = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState('python');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [testResults, setTestResults] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [runsRemaining, setRunsRemaining] = useState(2);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showHints, setShowHints] = useState(false);
    const [revealedHints, setRevealedHints] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [streak, setStreak] = useState(5);
    const [showNextButton, setShowNextButton] = useState(false);
    const isPaidUser = false;

    useEffect(() => {
        const todaysQuestion = getTodaysQuestion();
        const idx = questions.findIndex(q => q.id === todaysQuestion.id);
        setQuestionIndex(idx >= 0 ? idx : 0);
        setCurrentQuestion(todaysQuestion);
        setCode(todaysQuestion?.starterCode?.[selectedLanguage] || '');
    }, []);

    useEffect(() => {
        if (currentQuestion) {
            setCode(currentQuestion.starterCode?.[selectedLanguage] || '');
        }
    }, [selectedLanguage, currentQuestion]);

    const navigateQuestion = (direction) => {
        let newIndex = questionIndex + direction;
        if (newIndex < 0) newIndex = questions.length - 1;
        if (newIndex >= questions.length) newIndex = 0;

        setQuestionIndex(newIndex);
        setCurrentQuestion(questions[newIndex]);
        setCode(questions[newIndex]?.starterCode?.[selectedLanguage] || '');
        setOutput('');
        setTestResults(null);
        setHasSubmitted(false);
        setRunsRemaining(isPaidUser ? 4 : 2);
        setRevealedHints([]);
        setShowNextButton(false);
    };

    const handleRun = async () => {
        if (runsRemaining <= 0) {
            setOutput('❌ No runs remaining. Upgrade to Premium for more runs!');
            return;
        }

        if (!currentQuestion?.testCases) {
            setOutput('❌ No test cases available for this question.');
            return;
        }

        setIsRunning(true);
        setOutput('⏳ Compiling and running your code...');
        setTestResults(null);

        try {
            // Execute code against test cases (mock for now)
            const result = await executeCode(code, selectedLanguage, currentQuestion.testCases);

            setTestResults(result);
            setRunsRemaining(prev => prev - 1);

            // Generate output message
            let outputMsg = result.success
                ? '✅ All Test Cases Passed!\n\n'
                : '❌ Some Test Cases Failed\n\n';

            outputMsg += `📊 Results: ${result.passedCount}/${result.totalCount} passed\n`;
            outputMsg += `⏱️ Runtime: ${result.totalRuntime}ms\n`;
            outputMsg += `💾 Memory: ${result.memory} MB\n`;
            outputMsg += '━━━━━━━━━━━━━━━━━━━━\n\n';

            result.results.forEach((tc, index) => {
                const icon = tc.passed ? '✓' : '✗';
                const status = tc.passed ? 'Passed' : 'Failed';
                outputMsg += `${icon} Test Case ${tc.id}: ${status}\n`;

                if (!tc.passed && !tc.isHidden) {
                    outputMsg += `   Input: ${tc.input}\n`;
                    outputMsg += `   Expected: ${tc.expected}\n`;
                    outputMsg += `   Got: ${tc.actual}\n`;
                } else if (tc.isHidden) {
                    outputMsg += `   (Hidden test case)\n`;
                }
            });

            setOutput(outputMsg);
        } catch (error) {
            setOutput(`❌ Error: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async () => {
        if (hasSubmitted) {
            setOutput('❌ You have already submitted today. Come back tomorrow!');
            return;
        }

        if (!currentQuestion?.testCases) {
            setOutput('❌ No test cases available for this question.');
            return;
        }

        setIsRunning(true);
        setOutput('📤 Submitting your solution...');

        try {
            const result = await executeCode(code, selectedLanguage, currentQuestion.testCases);
            setTestResults(result);

            const timeStr = `${Math.floor(elapsedTime / 60)}m ${elapsedTime % 60}s`;

            if (result.success) {
                // All test cases passed - Success!
                setOutput(
                    `🎉 Submission Accepted!\n\n` +
                    `📊 Results: ${result.passedCount}/${result.totalCount} passed\n` +
                    `━━━━━━━━━━━━━━━━━━━━\n` +
                    `⏱️ Time Taken: ${timeStr}\n` +
                    `🚀 Runtime: ${result.totalRuntime}ms (Beats 95.2%)\n` +
                    `💾 Memory: ${result.memory} MB (Beats 78.4%)\n` +
                    `━━━━━━━━━━━━━━━━━━━━\n\n` +
                    `🔥 Streak: ${streak + 1} days!\n\n` +
                    `Click "Next Question" below to continue! ⬇️`
                );
                setHasSubmitted(true);
                setStreak(prev => prev + 1);
                setShowNextButton(true);
            } else {
                // Some test cases failed
                let outputMsg = `❌ Submission Rejected\n\n`;
                outputMsg += `📊 Results: ${result.passedCount}/${result.totalCount} passed\n`;
                outputMsg += '━━━━━━━━━━━━━━━━━━━━\n\n';

                result.results.forEach((tc) => {
                    const icon = tc.passed ? '✓' : '✗';
                    const status = tc.passed ? 'Passed' : 'Failed';
                    outputMsg += `${icon} Test Case ${tc.id}: ${status}\n`;

                    if (!tc.passed && !tc.isHidden) {
                        outputMsg += `   Input: ${tc.input}\n`;
                        outputMsg += `   Expected: ${tc.expected}\n`;
                        outputMsg += `   Got: ${tc.actual}\n\n`;
                    } else if (tc.isHidden && !tc.passed) {
                        outputMsg += `   (Hidden test case failed)\n\n`;
                    }
                });

                outputMsg += '\n💡 Tip: Check the failing test cases and try again!';
                setOutput(outputMsg);
            }
        } catch (error) {
            setOutput(`❌ Submission Error: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const revealHint = (index) => {
        if (!revealedHints.includes(index)) {
            setRevealedHints([...revealedHints, index]);
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
                    <div className="question-nav">
                        <button className="nav-btn" onClick={() => navigateQuestion(-1)} title="Previous">
                            <ChevronLeft size={18} />
                        </button>
                        <span className="question-counter">{questionIndex + 1}/{questions.length}</span>
                        <button className="nav-btn" onClick={() => navigateQuestion(1)} title="Next">
                            <ChevronRight size={18} />
                        </button>
                    </div>
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
                            disabled={!isPaidUser && !hasSubmitted}
                        >
                            📖 Solutions {!isPaidUser && !hasSubmitted && '🔒'}
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
                                {isPaidUser || hasSubmitted ? (
                                    <div className="solution-content">
                                        <h3>📖 Official Solution</h3>
                                        <div className="solution-explanation">
                                            <p>{currentQuestion.solution}</p>
                                        </div>
                                        <h4>Example Implementation:</h4>
                                        <pre><code>{currentQuestion.starterCode?.python}</code></pre>
                                    </div>
                                ) : (
                                    <div className="locked-content">
                                        <span className="lock-icon">🔒</span>
                                        <h3>Solution Locked</h3>
                                        <p>Submit your solution or upgrade to Premium to view the official solution.</p>
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
                            {showNextButton && (
                                <button
                                    className="next-question-btn"
                                    onClick={() => navigateQuestion(1)}
                                >
                                    🚀 Next Question →
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QOTD;

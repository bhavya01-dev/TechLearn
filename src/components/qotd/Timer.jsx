import { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ onTimeUpdate }) => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => {
                    const newTime = prev + 1;
                    if (onTimeUpdate) onTimeUpdate(newTime);
                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, onTimeUpdate]);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => setIsRunning(!isRunning);

    const resetTimer = () => {
        setSeconds(0);
        setIsRunning(true);
    };

    return (
        <div className="timer-container">
            <div className="timer-display">
                <span className="timer-icon">⏱️</span>
                <span className="timer-value">{formatTime(seconds)}</span>
            </div>
            <div className="timer-controls">
                <button
                    className={`timer-btn ${isRunning ? 'pause' : 'play'}`}
                    onClick={toggleTimer}
                    title={isRunning ? 'Pause' : 'Resume'}
                >
                    {isRunning ? '⏸' : '▶'}
                </button>
                <button
                    className="timer-btn reset"
                    onClick={resetTimer}
                    title="Reset"
                >
                    ↻
                </button>
            </div>
        </div>
    );
};

export default Timer;

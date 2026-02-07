import { useState } from 'react';
import './Leaderboard.css';

// Mock leaderboard data
const mockLeaderboardData = {
    Easy: [
        { rank: 1, username: 'CodeMaster', score: 100, time: '00:02:34', avatar: '🥇' },
        { rank: 2, username: 'AlgoNinja', score: 100, time: '00:03:12', avatar: '🥈' },
        { rank: 3, username: 'ByteWizard', score: 100, time: '00:04:01', avatar: '🥉' },
        { rank: 4, username: 'TechPro', score: 95, time: '00:05:22', avatar: '👤' },
        { rank: 5, username: 'DevHero', score: 90, time: '00:06:15', avatar: '👤' },
    ],
    Medium: [
        { rank: 1, username: 'AlgoKing', score: 100, time: '00:08:45', avatar: '🥇' },
        { rank: 2, username: 'CodeNinja', score: 100, time: '00:10:22', avatar: '🥈' },
        { rank: 3, username: 'BinaryBoss', score: 95, time: '00:12:10', avatar: '🥉' },
    ],
    Hard: [
        { rank: 1, username: 'LeetLegend', score: 100, time: '00:15:30', avatar: '🥇' },
        { rank: 2, username: 'ProCoder', score: 95, time: '00:18:45', avatar: '🥈' },
    ]
};

const Leaderboard = ({ difficulty }) => {
    const [activeTab, setActiveTab] = useState(difficulty || 'Easy');
    const data = mockLeaderboardData[activeTab] || [];

    return (
        <div className="leaderboard">
            <div className="leaderboard-header">
                <h3>🏆 Daily Leaderboard</h3>
                <p className="leaderboard-date">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>

            <div className="difficulty-tabs">
                {['Easy', 'Medium', 'Hard'].map((tab) => (
                    <button
                        key={tab}
                        className={`diff-tab ${activeTab === tab ? 'active' : ''} ${tab.toLowerCase()}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="leaderboard-table">
                <div className="table-header">
                    <span className="col-rank">Rank</span>
                    <span className="col-user">User</span>
                    <span className="col-score">Score</span>
                    <span className="col-time">Time</span>
                </div>

                <div className="table-body">
                    {data.length > 0 ? (
                        data.map((entry) => (
                            <div key={entry.rank} className={`table-row ${entry.rank <= 3 ? 'top-three' : ''}`}>
                                <span className="col-rank">
                                    <span className="rank-badge">{entry.avatar}</span>
                                </span>
                                <span className="col-user">{entry.username}</span>
                                <span className="col-score">{entry.score}</span>
                                <span className="col-time">{entry.time}</span>
                            </div>
                        ))
                    ) : (
                        <div className="no-data">
                            <span>🏃</span>
                            <p>Be the first to solve today's challenge!</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="leaderboard-footer">
                <p className="note">
                    <span className="lock-icon">🔒</span>
                    Free users can view scores but won't appear on the leaderboard.
                </p>
            </div>
        </div>
    );
};

export default Leaderboard;

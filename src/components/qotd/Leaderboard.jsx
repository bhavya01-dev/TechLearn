import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import './Leaderboard.css';

const toLeaderboardDifficulty = (value) => {
    const normalized = (value || '').toLowerCase();
    if (normalized === 'beginner' || normalized === 'easy') return 'Beginner';
    if (normalized === 'intermediate' || normalized === 'medium') return 'Intermediate';
    if (normalized === 'advanced' || normalized === 'hard') return 'Advanced';
    return 'Beginner';
};

const Leaderboard = ({ difficulty }) => {
    const [activeTab, setActiveTab] = useState(toLeaderboardDifficulty(difficulty));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setActiveTab(toLeaderboardDifficulty(difficulty));
    }, [difficulty]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const result = await api.getLeaderboard(activeTab);
                setData(Array.isArray(result) ? result : []);
            } catch (error) {
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, [activeTab]);

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
                {['Beginner', 'Intermediate', 'Advanced'].map((tab) => (
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
                    <span className="col-score">Result</span>
                    <span className="col-time">Time</span>
                </div>

                <div className="table-body">
                    {loading ? (
                        <div className="no-data">
                            <span>⏳</span>
                            <p>Loading leaderboard...</p>
                        </div>
                    ) : data.length > 0 ? (
                        data.map((entry) => {
                            const submittedAt = entry.submittedAt ? new Date(entry.submittedAt) : null;
                            const timeText = submittedAt
                                ? submittedAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                : '--:--';
                            const rankIcon = entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : '👤';
                            return (
                                <div key={`${entry.username}-${entry.rank}`} className={`table-row ${entry.rank <= 3 ? 'top-three' : ''}`}>
                                    <span className="col-rank">
                                        <span className="rank-badge">{rankIcon}</span>
                                    </span>
                                    <span className="col-user">{entry.username}</span>
                                    <span className="col-score">{entry.result}</span>
                                    <span className="col-time">{timeText}</span>
                                </div>
                            );
                        })
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

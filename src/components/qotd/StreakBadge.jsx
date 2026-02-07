import './StreakBadge.css';

const StreakBadge = ({ streak = 0, isPaidUser = false }) => {
    const getStreakEmoji = (count) => {
        if (count >= 30) return '🏆';
        if (count >= 14) return '🔥';
        if (count >= 7) return '⚡';
        if (count >= 3) return '✨';
        return '🌱';
    };

    const getStreakLevel = (count) => {
        if (count >= 30) return 'legendary';
        if (count >= 14) return 'blazing';
        if (count >= 7) return 'hot';
        if (count >= 3) return 'warming';
        return 'starting';
    };

    const getStreakMessage = (count) => {
        if (count >= 30) return 'Legendary!';
        if (count >= 14) return 'On Fire!';
        if (count >= 7) return 'Hot Streak!';
        if (count >= 3) return 'Keep Going!';
        if (count > 0) return 'Getting Started';
        return 'Start Streak';
    };

    return (
        <div className={`streak-badge ${getStreakLevel(streak)}`}>
            <div className="streak-icon">{getStreakEmoji(streak)}</div>
            <div className="streak-info">
                <span className="streak-count">{streak}</span>
                <span className="streak-label">day streak</span>
            </div>
            <div className="streak-message">{getStreakMessage(streak)}</div>
            {!isPaidUser && streak > 0 && (
                <div className="streak-upgrade-hint">
                    <span className="lock-icon">🔒</span>
                    <span>Upgrade to track streaks</span>
                </div>
            )}
        </div>
    );
};

export default StreakBadge;

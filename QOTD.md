# QOTD (Question of the Day)

Daily coding challenge with controlled execution and leaderboard visibility.

## Supported Languages
- Python
- Java

## Access Rules
Free users (including guests):
- Can run code.
- Can submit once per day.
- Maximum 2 runs per day.
- Can view their score.
- Do not appear on leaderboards.

Paid users:
- Can run code.
- Can submit once per day.
- Maximum 4 runs per day.
- Appear on leaderboards.
- Can view solutions and personal stats.

## Leaderboards
- Separate leaderboard per difficulty: Beginner, Intermediate, Advanced.
- Only logged-in paid users appear.
- Leaderboards are daily and reset automatically at the start of each day.

## API Overview

Endpoints:
- `GET /api/v1/qotd`
  - Returns today’s question and user progress (runs remaining, submission status).
  - Authentication is optional.

- `POST /api/v1/qotd/submit`
  - Runs code and optionally submits.
  - Body: `questionId`, `code`, `language`, `isSubmit`.
  - Authentication is optional.
  - Guest runs are tracked by IP + User-Agent (hashed) when enabled.

- `GET /api/v1/leaderboard/:difficulty`
  - Returns today’s leaderboard for the given difficulty.
  - Publicly accessible; only paid users appear.

## Error Messages (User-Friendly)
- Unsupported language: "Oops! We don't support that language yet."
- Run limit reached: "You've reached your daily run limit. Try again tomorrow!"
- Already submitted today: "You've already submitted today. Come back tomorrow for a new challenge!"
- Submit requires login: "Please log in to submit your solution and join the leaderboard!"
- Question not found: "Ouch! We couldn't find that question."
- Judge service failure: "Our compiler is having a short nap. Please try again in a moment."
- Server error: "Something went wrong on our end. We're looking into it!"

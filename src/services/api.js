const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const getAuthHeader = () => {
  try {
    const storedUser = localStorage.getItem('techlearn_user');
    if (!storedUser) return {};
    const parsed = JSON.parse(storedUser);
    const token = parsed?.token || parsed?.accessToken;
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
};

export const api = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          ...getAuthHeader()
        }
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.message || 'Network response was not ok');
      }
      return data;
    } catch (error) {
      console.error(`Fetch error for ${endpoint}:`, error);
      throw error;
    }
  },
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.message || 'Network response was not ok');
      }
      return result;
    } catch (error) {
      console.error(`Post error for ${endpoint}:`, error);
      throw error;
    }
  },
  getTodayQuestion: async () => {
    return await api.get('/v1/qotd');
  },
  submitSolution: async (questionId, code, language, isSubmit = false) => {
    return await api.post('/v1/qotd/submit', { questionId, code, language, isSubmit });
  },
  getLeaderboard: async (difficulty) => {
    return await api.get(`/v1/leaderboard/${difficulty}`);
  }
};

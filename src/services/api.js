// Simple API service stub
const API_URL = 'https://api.techlearnsolutions.com'; // Placeholder

export const api = {
  get: async (endpoint) => {
    // In a real app: return axios.get(`${API_URL}${endpoint}`);
    console.log(`Fetching ${endpoint}`);
    return Promise.resolve({ data: [] });
  },
  post: async (endpoint, data) => {
    // In a real app: return axios.post(`${API_URL}${endpoint}`, data);
    console.log(`Posting to ${endpoint}`, data);
    return Promise.resolve({ data: {} });
  }
};

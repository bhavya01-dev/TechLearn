const API_URL = 'https://api.techlearnsolutions.com';
export const api = {
  get: async (endpoint) => {
    console.log(`Fetching ${endpoint}`);
    return Promise.resolve({ data: [] });
  },
  post: async (endpoint, data) => {
    console.log(`Posting to ${endpoint}`, data);
    return Promise.resolve({ data: {} });
  }
};

import axios from 'axios';

// The base URL for the API requests
export const BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ispeak_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Health check
export const healthCheck = () => api.get('/health');

// Videos
export const getVideos = () => api.get('/videos');
export const getVideoById = (id) => api.get(`/videos/${id}`);
export const getTrending = () => api.get('/videos/trending');
export const searchVideos = (q) => api.get(`/videos/search?q=${q}`);
export const deleteVideo = (id) => api.delete(`/videos/${id}`);

// Posts
export const getPosts = () => api.get('/posts');
export const getPostById = (id) => api.get(`/posts/${id}`);
export const createPost = (data) => api.post('/posts', data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Auth
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const logout = () => api.post('/auth/logout');
export const getProfile = () => api.get('/auth/profile');
export const updateProfile = (data) => api.put('/auth/profile', data);
export const changePassword = (data) => api.post('/auth/change-password', data);

// Analytics
export const viewVideo = (id) => api.post(`/videos/${id}/view`);
export const viewPost = (id) => api.post(`/posts/${id}/view`);
export const likeVideo = (id) => api.post(`/videos/${id}/like`);
export const likePost = (id) => api.post(`/posts/${id}/like`);
export const getLikes = (params) => api.get('/likes', { params });

// Dashboard
export const getDashboard = () => api.get('/dashboard');

// ============ ADS EXPORTS - ADD THESE ============
export const getDisplayAds = () => api.get('/ads');
export const getActiveDisplayAd = () => api.get('/ads/active');
export const createDisplayAd = (data) => api.post('/admin/ads', data);
export const updateDisplayAd = (id, data) => api.put(`/admin/ads/${id}`, data);
export const deleteDisplayAd = (id) => api.delete(`/admin/ads/${id}`);
export const trackAdView = (id) => api.post(`/ads/${id}/view`);
export const trackAdClick = (id) => api.post(`/ads/${id}/click`);  // ✅ ADD THIS
// ================================================

// Donations
export const createDonation = (data) => api.post('/donations', data);
export const getDonations = () => api.get('/donations');
export const getDonationStats = () => api.get('/donations/stats');

// Sponsorships
export const createSponsorship = (data) => api.post('/sponsorships', data);
export const getSponsorships = () => api.get('/sponsorships');
export const updateSponsorshipStatus = (id, data) => api.put(`/sponsorships/${id}`, data);

// Newsletter
export const subscribe = (data) => api.post('/newsletter/subscribe', data);
export const unsubscribe = (email) => api.delete(`/newsletter/unsubscribe/${email}`);
export const getSubscribers = () => api.get('/admin/newsletter/subscribers');

export default api;
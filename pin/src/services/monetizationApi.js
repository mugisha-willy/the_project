import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

// Donations
export const createDonation = (data) => API.post('/donations', data);
export const getDonations = () => API.get('/donations');
export const getDonationStats = () => API.get('/donations/stats');

// Sponsorships
export const createSponsorship = (data) => API.post('/sponsorships', data);
export const getSponsorships = () => API.get('/sponsorships');
export const updateSponsorshipStatus = (id, data) => API.put(`/sponsorships/${id}`, data);

// Newsletter
export const subscribe = (data) => API.post('/subscribe', data);
export const getSubscribers = () => API.get('/subscribers');
export const unsubscribe = (email) => API.get(`/unsubscribe/${email}`);

export default API;
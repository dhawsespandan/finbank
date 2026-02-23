import axios from 'axios';

const API = axios.create({ baseURL: 'https://finbank-backend-zirx.onrender.com/api' });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

export const applyLoan = (data) => API.post('/loans/apply', data);
export const getMyLoans = () => API.get('/loans/my-loans');
export const getMySummary = () => API.get('/loans/my-summary');

export const getPendingLoans = () => API.get('/loans/pending');
export const reviewLoan = (id, decision) => API.post(`/loans/review/${id}`, { decision });

export const getAllApprovedLoans = () => API.get('/loans/all-approved');
export const markLoanPaid = (id) => API.put(`/loans/${id}/mark-paid`);
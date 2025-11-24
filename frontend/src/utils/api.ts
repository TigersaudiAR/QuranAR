import axios from 'axios';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authAPI = {
  register: (data: { email: string; password: string; name: string; role?: string }) =>
    api.post<AuthResponse>('/api/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/api/auth/login', data),
  me: () => api.get<{ user: User }>('/api/auth/me'),
};

export const memorizationAPI = {
  getSets: () => api.get('/api/memorization/sets'),
  getSet: (id: number) => api.get(`/api/memorization/sets/${id}`),
  createSet: (data: { title: string; type: 'SURAH' | 'PAGE' }) =>
    api.post('/api/memorization/sets', data),
  updateSet: (id: number, data: { title?: string; type?: 'SURAH' | 'PAGE' }) =>
    api.put(`/api/memorization/sets/${id}`, data),
  deleteSet: (id: number) => api.delete(`/api/memorization/sets/${id}`),
  addItem: (setId: number, data: any) =>
    api.post(`/api/memorization/sets/${setId}/items`, data),
  updateItem: (itemId: number, data: any) =>
    api.put(`/api/memorization/items/${itemId}`, data),
  deleteItem: (itemId: number) => api.delete(`/api/memorization/items/${itemId}`),
};

export const halaqatAPI = {
  getHalaqat: () => api.get('/api/halaqat'),
  getHalaqah: (id: number) => api.get(`/api/halaqat/${id}`),
  createHalaqah: (data: { name: string; description?: string; schedule?: string }) =>
    api.post('/api/halaqat', data),
  updateHalaqah: (id: number, data: any) => api.put(`/api/halaqat/${id}`, data),
  addMember: (id: number, data: { userId: number; role?: string }) =>
    api.post(`/api/halaqat/${id}/members`, data),
  removeMember: (id: number, memberId: number) =>
    api.delete(`/api/halaqat/${id}/members/${memberId}`),
  createAssignment: (id: number, data: any) =>
    api.post(`/api/halaqat/${id}/assignments`, data),
  getAssignments: () => api.get('/api/halaqat/assignments/me'),
  updateAssignment: (assignmentId: number, data: any) =>
    api.put(`/api/halaqat/assignments/${assignmentId}`, data),
  createSessionLog: (id: number, data: any) =>
    api.post(`/api/halaqat/${id}/session-logs`, data),
  getSessionLogs: (id: number) => api.get(`/api/halaqat/${id}/session-logs`),
};

export const adminAPI = {
  getUsers: () => api.get('/api/admin/users'),
  createUser: (data: any) => api.post('/api/admin/users', data),
  updateUser: (id: number, data: any) => api.put(`/api/admin/users/${id}`, data),
  deleteUser: (id: number) => api.delete(`/api/admin/users/${id}`),
  getLessons: (category?: string) =>
    api.get('/api/admin/lessons', { params: { category } }),
  createLesson: (data: any) => api.post('/api/admin/lessons', data),
  updateLesson: (id: number, data: any) => api.put(`/api/admin/lessons/${id}`, data),
  deleteLesson: (id: number) => api.delete(`/api/admin/lessons/${id}`),
  getCategories: () => api.get('/api/admin/categories'),
  createCategory: (data: any) => api.post('/api/admin/categories', data),
  getDhikr: (category?: string) =>
    api.get('/api/admin/dhikr', { params: { category } }),
  createDhikr: (data: any) => api.post('/api/admin/dhikr', data),
  updateDhikr: (id: number, data: any) => api.put(`/api/admin/dhikr/${id}`, data),
  deleteDhikr: (id: number) => api.delete(`/api/admin/dhikr/${id}`),
  getHalaqat: () => api.get('/api/admin/halaqat'),
  deleteHalaqah: (id: number) => api.delete(`/api/admin/halaqat/${id}`),
};

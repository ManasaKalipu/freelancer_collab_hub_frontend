import axiosInstance, { setAuthToken } from '../api/axiosConfig';

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const { token, user } = response.data;
    setAuthToken(token);
    return user;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    const { token, user } = response.data;
    setAuthToken(token);
    return user;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = () => {
  setAuthToken(null);
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return token && user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const updateProfile = async (userId, profileData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const resetPassword = async (email) => {
  try {
    await axiosInstance.post('/auth/reset-password', { email });
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyEmail = async (token) => {
  try {
    await axiosInstance.post('/auth/verify-email', { token });
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
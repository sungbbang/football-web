import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/user`,
  withCredentials: true,
});

export const verifyToken = async () => {
  const res = await instance.post('/verify-token');
  return res.data;
};

export const signIn = async formData => {
  const res = await instance.post('/login', formData);
  return res.data;
};

export const signOut = async () => {
  await instance.post('/logout');
};

export const signUp = async formData => {
  await instance.post('/signup', formData);
};

import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/user`,
});

export const verifyToken = async () => {
  const res = await instance.post(
    '/verify-token',
    {},
    { withCredentials: true },
  );
  return res.data;
};

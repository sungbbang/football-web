import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/post`,
});

export const createPost = async postData => {
  const res = await instance.post('/', postData, {
    withCredentials: true,
  });
  return res.data;
};

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

export const fetchPosts = async () => {
  const res = await instance.get('/');
  return res.data;
};

export const fetchPostById = async id => {
  const res = await instance.get(`/${id}`);
  return res.data;
};

export const likePost = async id => {
  const res = await instance.post(`/${id}/like`, {}, { withCredentials: true });
  return res.data;
};

export const editPost = async (id, postData) => {
  const res = await instance.patch(`/${id}`, postData, {
    withCredentials: true,
  });
  return res.data;
};

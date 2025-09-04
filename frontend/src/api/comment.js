import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/comment`,
});

export const fetchCommentByPostId = async id => {
  const res = await instance.get('/', { params: { postId: id } });
  return res.data;
};

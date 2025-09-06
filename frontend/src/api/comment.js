import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/comment`,
});

export const fetchCommentsByPostId = async postId => {
  const res = await instance.get(`/${postId}`);
  return res.data;
};

export const createComment = async (postId, commentData) => {
  const res = await instance.post(`/${postId}`, commentData, {
    withCredentials: true,
  });
  return res.data;
};

export const editComment = async (commentId, commentData) => {
  const res = await instance.patch(`/${commentId}`, commentData, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteComment = async id => {
  const res = await instance.delete(`/${id}`, { withCredentials: true });
  return res.data;
};

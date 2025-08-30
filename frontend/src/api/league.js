import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/league`,
});

export const fetchLeagueInfo = async league => {
  const res = await instance.get('/info', {
    params: { category: league },
  });
  return res.data;
};

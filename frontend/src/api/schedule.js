import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/schedule`,
});

export const fetchNearestDate = async dateString => {
  const res = await instance.get('/all/nearest-date', {
    params: { date: dateString },
  });
  return res.data;
};

export const fetchDateRange = async () => {
  const res = await instance.get('/dateRange');
  return res.data;
};

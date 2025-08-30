import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/schedule`,
});

export const fetchNearestDate = async () => {
  const res = await instance.get('/all/nearest-date');
  return res.data;
};

export const fetchDateRange = async () => {
  const res = await instance.get('/dateRange');
  return res.data;
};

export const fetchMonthlySchedule = async dateString => {
  const res = await instance.get('/all/monthly', {
    params: { date: dateString },
  });
  return res.data;
};

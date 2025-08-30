import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/schedule`,
});

export const fetchNearestDate = async league => {
  const res = await instance.get('/nearest-date', {
    params: { category: league },
  });
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

export const fetchSeasonSchedule = async (league, season) => {
  const res = await instance.get('/seasonSchedule', {
    params: { category: league, season: season },
  });
  return res.data;
};

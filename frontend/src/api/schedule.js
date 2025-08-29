import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/schedule',
});

export const fetchNearestDate = async dateString => {
  const res = await instance.get('/all/nearest-date', {
    params: { date: dateString },
  });
  return res.data;
};

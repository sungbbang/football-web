import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/record`,
});

export const fetchTeamRecord = async (league, season) => {
  const res = await instance.get('/team', {
    params: { league: league, season: season },
  });
  return res.data;
};

export const fetchTopScorerRecord = async (league, season) => {
  const res = await instance.get('/player/topScorer', {
    params: { league: league, season: season },
  });
  return res.data;
};

export const fetchTopAssistorRecord = async (league, season) => {
  const res = await instance.get('/player/topAssistor', {
    params: { league: league, season: season },
  });
  return res.data;
};

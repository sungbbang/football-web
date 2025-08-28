const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
  },
});

// 응답 인터셉터
instance.interceptors.response.use(
  function (response) {
    if (response.status === 204) {
      const errorMessage = response.data.errors?.bug || '데이터 없음';
      const error = new Error(`204 No Content: ${errorMessage}`);
      error.response = response;
      throw error;
    }

    if (
      response.data.errors &&
      typeof response.data.errors === 'object' &&
      !Array.isArray(response.data.errors) &&
      Object.keys(response.data.errors).length > 0
    ) {
      const errorDetails = JSON.stringify(response.data.errors);
      const error = new Error(
        `API 응답 에러 (${response.status}): ${errorDetails}`
      );
      error.response = response;
      throw error;
    }

    return response;
  },
  function (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
    return Promise.reject(error);
  }
);

async function fetchLeagueSeasons(leagueId) {
  try {
    const response = await instance.get(`/leagues?id=${leagueId}`);
    return response;
  } catch (error) {
    throw error;
  }
}

async function fetchLeagueFixtures(year, leagueId) {
  try {
    const response = await instance.get(
      `/fixtures?season=${year}&league=${leagueId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

async function fetchFixturesByDateRange(
  year,
  leagueId,
  fromDateStr,
  toDateStr
) {
  try {
    const response = await instance.get(
      `/fixtures?season=${year}&league=${leagueId}&from=${fromDateStr}&to=${toDateStr}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

async function fetchTeamStandings(year, leagueId) {
  try {
    const response = await instance.get(
      `/standings?season=${year}&league=${leagueId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

async function fetchTopScorers(year, leagueId) {
  try {
    const response = await instance.get(
      `/players/topscorers?season=${year}&league=${leagueId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

async function fetchTopAssistors(year, leagueId) {
  try {
    const response = await instance.get(
      `/players/topassists?season=${year}&league=${leagueId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchLeagueSeasons,
  fetchLeagueFixtures,
  fetchFixturesByDateRange,
  fetchTeamStandings,
  fetchTopScorers,
  fetchTopAssistors,
};

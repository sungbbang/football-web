require('dotenv').config();
const League = require('../models/League');
const { connectDB, disconnectDB } = require('../config/db');
const {
  fetchLeagueSeasons,
  fetchLeagueFixtures,
  fetchTeamStandings,
  fetchTopScorers,
  fetchTopAssistors,
} = require('../services/footballOpenApi');
const {
  updateLeagueSeasons,
  updateLeagueFixtures,
  updateTeamStandings,
  updateTopScorers,
  updateTopAssistors,
} = require('../controllers');
const {
  checkRateLimitState,
  updateRateLimitState,
} = require('../utils/apiLimitManager');

const dataUpdateTasks = [
  {
    name: '리그 일정',
    apiFunc: fetchLeagueFixtures,
    dbFunc: updateLeagueFixtures,
  },
  {
    name: '팀 순위',
    apiFunc: fetchTeamStandings,
    dbFunc: updateTeamStandings,
  },
  {
    name: '득점왕',
    apiFunc: fetchTopScorers,
    dbFunc: updateTopScorers,
  },
  {
    name: '도움왕',
    apiFunc: fetchTopAssistors,
    dbFunc: updateTopAssistors,
  },
];

async function populateInitialData() {
  console.time('초기 데이터 구축 총 걸린 시간');
  await connectDB();

  const leagueIds = [39, 140, 78, 135, 61];

  // 각 리그의 시즌 정보 업데이트
  for (const leagueId of leagueIds) {
    try {
      await checkRateLimitState();
      const response = await fetchLeagueSeasons(leagueId);
      updateRateLimitState(response);
      await updateLeagueSeasons(leagueId, response);
    } catch (error) {
      console.error(
        `${leagueId}리그 시즌 정보 구축 중 에러 발생: `,
        error.message,
        error
      );
    }
  }

  const leagueList = await League.find();
  // 각 리그마다 전체 일정, 팀 순위, 득점왕 순위, 도움왕 순위 데이터 업데이트
  for (const { leagueId, seasons } of leagueList) {
    for (const season of seasons) {
      const { year } = season;
      for (const { name, apiFunc, dbFunc } of dataUpdateTasks) {
        try {
          await checkRateLimitState();
          const response = await apiFunc(year, leagueId);
          updateRateLimitState(response);
          await dbFunc(year, leagueId, response);
        } catch (error) {
          console.error(
            `${year}시즌 ${leagueId}리그 ${name} 정보 구축 중 에러 발생: `,
            error.message,
            error
          );
        }
      }
    }
  }
  console.timeEnd('초기 데이터 구축 총 걸린 시간');
  await disconnectDB();
}

populateInitialData();

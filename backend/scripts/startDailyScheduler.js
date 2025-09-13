const cron = require('node-cron');
const League = require('../models/League');
const {
  fetchFixturesByDateRange,
  fetchTeamStandings,
  fetchTopScorers,
  fetchTopAssistors,
} = require('../services/footballOpenApi');
const {
  updateFixturesByDateRange,
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

async function dailyUpdateData() {
  console.log('daily Update Data...');
  const leagueList = await League.find();
  const currentLeagueSeasons = leagueList.flatMap(league =>
    league.seasons
      .filter(season => season.current)
      .map(season => ({ year: season.year, id: league.leagueId }))
  );

  const currentDay = new Date();
  currentDay.setHours(0, 0, 0, 0);
  const c_year = currentDay.getFullYear();
  const c_month = currentDay.getMonth() + 1;
  const c_date = currentDay.getDate();

  const prevDay = new Date(currentDay);
  prevDay.setDate(currentDay.getDate() - 1);
  const p_year = prevDay.getFullYear();
  const p_month = prevDay.getMonth() + 1;
  const p_date = prevDay.getDate();

  const dateFormat = (y, m, d) => {
    return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  };

  const fromDateStr = dateFormat(p_year, p_month, p_date);
  const toDateStr = dateFormat(c_year, c_month, c_date);

  for (const { year, id } of currentLeagueSeasons) {
    try {
      await checkRateLimitState();
      const response = await fetchFixturesByDateRange(
        year,
        id,
        fromDateStr,
        toDateStr
      );
      updateRateLimitState(response);
      await updateFixturesByDateRange(
        year,
        id,
        fromDateStr,
        toDateStr,
        response
      );
    } catch (error) {
      console.error(
        `${year}시즌 ${id}리그 ${fromDateStr} ~ ${toDateStr} 정보 구축 중 에러 발생: `,
        error.message,
        error
      );
    }

    for (const { name, apiFunc, dbFunc } of dataUpdateTasks) {
      try {
        await checkRateLimitState();
        const response = await apiFunc(year, id);
        updateRateLimitState(response);
        await dbFunc(year, id, response);
      } catch (error) {
        console.error(
          `${year}시즌 ${id}리그 ${name} 정보 구축 중 에러 발생: `,
          error.message,
          error
        );
      }
    }
  }
}

function startDailyScheduler() {
  cron.schedule(
    '0 0 9 * * *',
    async () => {
      console.log('--- 매일 오전 9시 정기 데이터 갱신 작업 시작 ---');
      await dailyUpdateData();
      console.log('--- 매일 오전 9시 정기 데이터 갱신 작업 완료 ---');
    },
    {
      scheduled: true,
      timezone: 'Asia/Seoul',
    }
  );
}

module.exports = { startDailyScheduler, dailyUpdateData };

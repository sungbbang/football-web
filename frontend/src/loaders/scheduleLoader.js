import { redirect } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { dateRangeQuery, nearestDateQuery } from '../query';

export const scheduleLoader =
  queryClient =>
  async ({ request }) => {
    const url = new URL(request.url);
    const queryDate = url.searchParams.get('date');
    const queryCategory = url.searchParams.get('category');

    // overall loader
    if (!queryCategory) {
      if (!queryDate) {
        const { result } =
          await queryClient.ensureQueryData(nearestDateQuery());
        const resultDate = new Date(result.date);
        const formattedDate = formatDate(resultDate);
        throw redirect(`/schedule?date=${formattedDate}`, { replace: true });
      }
      await queryClient.ensureQueryData(dateRangeQuery());
    }

    // league loader
    else {
      if (!queryDate) {
        const data = await queryClient.ensureQueryData(
          leagueClosestDateQuery(queryCategory),
        );
        throw redirect(`/schedule?category=${queryCategory}&date=${data}`, {
          replace: true,
        });
      }

      const leagueInfo = await queryClient.ensureQueryData(
        leagueInfoQuery(queryCategory, queryDate),
      );

      if (!leagueInfo) {
        throw new Error('queryDate is invalid');
      }

      const seasonYear = leagueInfo.currSeason.year;

      await queryClient.ensureQueryData(
        leagueScheduleQuery(queryCategory, seasonYear),
      );

      return { queryCategory, queryDate, seasonYear };
    }
  };

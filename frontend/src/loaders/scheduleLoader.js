import { redirect } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { dateRangeQuery, leagueInfoQuery, nearestDateQuery } from '../query';

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
        const { result } = await queryClient.ensureQueryData(
          nearestDateQuery(queryCategory),
        );
        const resultDate = new Date(result.date);
        const formattedDate = formatDate(resultDate);
        throw redirect(
          `/schedule?category=${queryCategory}&date=${formattedDate}`,
          {
            replace: true,
          },
        );
      }

      await queryClient.ensureQueryData(leagueInfoQuery(queryCategory));
    }
  };

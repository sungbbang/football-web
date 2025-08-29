import { queryOptions } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';
import { fetchNearestDate } from '../api/schedule';

export const nearestDateQuery = dateString =>
  queryOptions({
    queryKey: ['nearestDate', 'all', dateString],
    queryFn: () => fetchNearestDate(dateString),
    staleTime: 1000 * 60 * 30,
  });

export const scheduleLoader =
  queryClient =>
  async ({ request }) => {
    const url = new URL(request.url);
    const queryDate = url.searchParams.get('date');
    const queryCategory = url.searchParams.get('category');

    // overall loader
    if (!queryCategory) {
      const data = await queryClient.ensureQueryData(nearestDateQuery());
      console.log(data);
      // throw redirect(`/schedule?date=${data}`);
    }
    // league loader
  };

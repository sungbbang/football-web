import { queryOptions } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';
import { fetchDateRange, fetchNearestDate } from '../api/schedule';
import { formatDate } from '../utils/formatDate';

export const nearestDateQuery = dateParam =>
  queryOptions({
    queryKey: ['nearestDate', 'all', dateParam],
    queryFn: () => fetchNearestDate(dateParam),
    staleTime: 1000 * 60 * 30,
  });

export const dateRangeQuery = () =>
  queryOptions({
    queryKey: ['dateRange'],
    queryFn: fetchDateRange,
    staleTime: 1000 * 60 * 60,
  });

export const scheduleLoader =
  queryClient =>
  async ({ request }) => {
    const url = new URL(request.url);
    const queryDate = url.searchParams.get('date');
    const queryCategory = url.searchParams.get('category');

    // overall loader
    if (!queryCategory) {
      const { result } = await queryClient.ensureQueryData(
        nearestDateQuery(formatDate(queryDate)),
      );
      const resultDate = new Date(result.date);
      const formattedDate = formatDate(resultDate);
      if (queryDate !== formattedDate) {
        throw redirect(`/schedule?date=${formattedDate}`, { replace: true });
      }

      await queryClient.ensureQueryData(dateRangeQuery());
    }
    // league loader
  };

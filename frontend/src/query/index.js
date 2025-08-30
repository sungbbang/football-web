import { queryOptions } from '@tanstack/react-query';
import {
  fetchDateRange,
  fetchMonthlySchedule,
  fetchNearestDate,
} from '../api/schedule';

export const nearestDateQuery = () =>
  queryOptions({
    queryKey: ['nearestDate', 'all'],
    queryFn: fetchNearestDate,
    staleTime: 1000 * 60 * 30,
  });

export const dateRangeQuery = () =>
  queryOptions({
    queryKey: ['dateRange'],
    queryFn: fetchDateRange,
    staleTime: 1000 * 60 * 60,
  });

export const monthlyScheduleQuery = dateParam => {
  const [y, m] = dateParam.split('-').map(Number);
  return queryOptions({
    queryKey: ['monthlySchedule', y, m],
    queryFn: () => fetchMonthlySchedule(dateParam),
    staleTime: 1000 * 60 * 60,
  });
};

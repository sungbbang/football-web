import { queryOptions } from '@tanstack/react-query';
import {
  fetchDateRange,
  fetchMonthlySchedule,
  fetchNearestDate,
  fetchSeasonSchedule,
} from '../api/schedule';
import { fetchLeagueInfo } from '../api/league';

export const nearestDateQuery = categoryParam =>
  queryOptions({
    queryKey: ['nearestDate', `${categoryParam ? categoryParam : 'all'}`],
    queryFn: () => fetchNearestDate(categoryParam),
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

export const leagueInfoQuery = categoryParam =>
  queryOptions({
    queryKey: ['leagueInfo', categoryParam],
    queryFn: () => fetchLeagueInfo(categoryParam),
    staleTime: 1000 * 60 * 60,
  });

export const seasonScheduleQuery = (categoryParam, seasonYear) =>
  queryOptions({
    queryKey: ['seasonSchedule', categoryParam, seasonYear],
    queryFn: () => fetchSeasonSchedule(categoryParam, seasonYear),
    staleTime: 1000 * 60 * 60,
  });

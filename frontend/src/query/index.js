import { queryOptions } from '@tanstack/react-query';
import {
  fetchDateRange,
  fetchMonthlySchedule,
  fetchNearestDate,
  fetchSeasonSchedule,
} from '../api/schedule';
import { fetchLeagueInfo } from '../api/league';
import {
  fetchTeamRecord,
  fetchTopAssistorRecord,
  fetchTopScorerRecord,
} from '../api/record';
import { fetchPostById, fetchPosts } from '../api/post';
import { fetchCommentsByPostId } from '../api/comment';

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

export const teamRecordQuery = (categoryParam, seasonYear) =>
  queryOptions({
    queryKey: ['teamRecord', categoryParam, seasonYear],
    queryFn: () => fetchTeamRecord(categoryParam, seasonYear),
    staleTime: 1000 * 60 * 60,
  });

export const topScorerRecordQuery = (categoryParam, seasonYear) =>
  queryOptions({
    queryKey: ['topScorerRecord', categoryParam, seasonYear],
    queryFn: () => fetchTopScorerRecord(categoryParam, seasonYear),
    staleTime: 1000 * 60 * 60,
  });

export const topAssistorRecordQuery = (categoryParam, seasonYear) =>
  queryOptions({
    queryKey: ['topAssistorRecord', categoryParam, seasonYear],
    queryFn: () => fetchTopAssistorRecord(categoryParam, seasonYear),
    staleTime: 1000 * 60 * 60,
  });

export const postsQuery = () =>
  queryOptions({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 1,
  });

export const postQuery = postId =>
  queryOptions({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
    staleTime: 1000 * 60 * 1,
  });

export const commentsQuery = postId =>
  queryOptions({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsByPostId(postId),
    staleTime: 1000 * 60 * 1,
  });

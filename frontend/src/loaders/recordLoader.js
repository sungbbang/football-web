import { redirect } from 'react-router-dom';
import { leagueInfoQuery } from '../query';

export const recordLoader =
  queryClient =>
  async ({ params, request }) => {
    const selectedLeague = params.league;
    const url = new URL(request.url);
    const selectedTab = url.searchParams.get('tab');
    const selectedSeason = url.searchParams.get('season');

    if (!selectedSeason) {
      const { result } = await queryClient.ensureQueryData(
        leagueInfoQuery(selectedLeague),
      );

      const recentSeasonYear = result.seasons.find(
        season => season.current,
      ).year;

      return redirect(
        `/record/${selectedLeague}?season=${recentSeasonYear}&tab=teamRank`,
        { replace: true },
      );
    }

    return { selectedLeague, selectedSeason, selectedTab };
  };

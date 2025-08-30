import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { leagueInfoQuery, seasonScheduleQuery } from '../../query';
import useScrollTab from '../../hooks/useScrollTab';
import MatchList from './MatchList';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';

const selectedStyle = `aria-selected:font-semibold aria-selected:text-blue-500 aria-selected:underline aria-selected:underline-offset-6`;

function LeagueSchedule({ selectedDate, selectedCategory }) {
  const nav = useNavigate();
  const { setRef: setMonthRef } = useScrollTab(
    new Date(selectedDate).getMonth() + 1,
  );
  const { data: leagueInfoData } = useSuspenseQuery(
    leagueInfoQuery(selectedCategory),
  );

  const leagueInfo = leagueInfoData.result;
  const currentSeasonInfo = leagueInfo.seasons.find(season => {
    const seasonStart = new Date(season.start);
    const seasonEnd = new Date(season.end);
    const currDate = new Date(selectedDate);

    seasonStart.setHours(0, 0, 0, 0);
    seasonEnd.setHours(0, 0, 0, 0);
    currDate.setHours(0, 0, 0, 0);

    return seasonStart <= currDate && currDate <= seasonEnd;
  });

  const { data: seasonScheduleData } = useSuspenseQuery(
    seasonScheduleQuery(selectedCategory, currentSeasonInfo.year),
  );

  const seasonSchedule = seasonScheduleData.result;

  function getMonthsOfCurrentSeason(start, end) {
    const startDate = new Date(start);
    startDate.setDate(1);
    const endDate = new Date(end);

    const seasonMonth = [];
    while (startDate <= endDate) {
      seasonMonth.push({
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
      });
      startDate.setMonth(startDate.getMonth() + 1);
    }
    return seasonMonth;
  }

  const monthsOfCurrentSeason = getMonthsOfCurrentSeason(
    seasonSchedule[0].date,
    seasonSchedule[seasonSchedule.length - 1].date,
  );

  const getDivideMatchDate = matchListOfMonth => {
    const lastMatchDate = new Date(matchListOfMonth.at(-1).date);

    const lastDate = lastMatchDate.getDate();

    const dateList = Array.from({ length: lastDate + 1 }, () => []);

    matchListOfMonth.forEach(v => {
      const matchDate = new Date(v.date);
      dateList[matchDate.getDate()].push(v);
    });

    return dateList;
  };

  const filteredSchedule = useMemo(
    () =>
      seasonSchedule.filter(match => {
        const matchDate = new Date(match.date);
        const selectedMonth = Number(selectedDate.split('-')[1]);

        return matchDate.getMonth() + 1 === selectedMonth;
      }),
    [seasonSchedule, selectedDate],
  );

  const matchDatesOfMonth = getDivideMatchDate(filteredSchedule);

  const onClickMonthItem = (year, month) => {
    const newDateObj = new Date(selectedDate);
    newDateObj.setFullYear(year);
    newDateObj.setMonth(month - 1);
    newDateObj.setDate(1);
    newDateObj.setHours(0, 0, 0, 0);

    const monthStartMatch = seasonSchedule.find(match => {
      const matchDate = new Date(match.date);
      matchDate.setHours(0, 0, 0, 0);

      return newDateObj <= matchDate;
    });

    const newFormattedDate = formatDate(monthStartMatch.date);
    nav(`/schedule?category=${leagueInfo.leagueName}&date=${newFormattedDate}`);
  };

  const onClickPrevSeasonBtn = () => {
    const prevSeasonInfo = leagueInfo.seasons.find(
      season => currentSeasonInfo.year - 1 === season.year,
    );
    nav(
      `/schedule?category=${leagueInfo.leagueName}&date=${formatDate(prevSeasonInfo.end)}`,
    );
  };

  const onClickNextSeasonBtn = () => {
    const nextSeasonInfo = leagueInfo.seasons.find(
      season => currentSeasonInfo.year + 1 === season.year,
    );

    nav(
      `/schedule?category=${leagueInfo.leagueName}&date=${formatDate(nextSeasonInfo.start)}`,
    );
  };

  const hasPrevSeason = () =>
    leagueInfo.seasons.find(
      season => currentSeasonInfo.year - 1 === season.year,
    );

  const hasNextSeason = () =>
    leagueInfo.seasons.find(
      season => currentSeasonInfo.year + 1 === season.year,
    );

  return (
    <>
      <div className='flex items-center justify-center text-2xl font-bold lg:text-3xl'>
        <button
          disabled={!hasPrevSeason()}
          className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-20'
          onClick={onClickPrevSeasonBtn}
        >
          &lt;
        </button>
        <span className='mx-5'>
          {currentSeasonInfo.year}-
          {parseInt((currentSeasonInfo.year + '').slice(2)) + 1}
        </span>
        <button
          disabled={!hasNextSeason()}
          className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-20'
          onClick={onClickNextSeasonBtn}
        >
          &gt;
        </button>
      </div>

      <div>
        <div className='flex justify-center'>
          <ul className='scrollbar-hide flex snap-x flex-nowrap gap-10 overflow-x-auto'>
            {monthsOfCurrentSeason.map((item, i) => (
              <li
                key={i}
                aria-selected={
                  new Date(selectedDate).getMonth() + 1 === item.month
                }
                ref={el => {
                  setMonthRef(el, item.month);
                }}
                onClick={() => onClickMonthItem(item.year, item.month)}
                className={`flex-shrink-0 text-base hover:text-blue-500 xl:text-xl ${selectedStyle} cursor-pointer`}
              >
                {String(item.month).padStart(2, '0')}월
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='space-y-20'>
        {matchDatesOfMonth.map((v, i) => {
          if (v.length > 0) {
            return <MatchList key={i} matchList={v} />;
          }
        })}
      </div>
    </>
  );
}

export default LeagueSchedule;

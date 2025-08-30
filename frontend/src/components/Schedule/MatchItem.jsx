import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

function MatchItem({
  awayGoals,
  awayTeamLogo,
  awayTeamName,
  date,
  homeGoals,
  homeTeamLogo,
  homeTeamName,
  isFinished,
  leagueName,
  stadium,
}) {
  return (
    <li>
      <Link to={`/schedule?category=${leagueName}&date=${formatDate(date)}`}>
        <div className='flex items-center justify-between rounded-2xl border border-stone-400 p-4 hover:bg-stone-100'>
          <div className='flex flex-col items-start space-y-2 lg:flex-row lg:items-center lg:space-y-0'>
            <span className='rounded-lg border border-gray-300 px-3 text-center text-sm font-semibold lg:mr-4 lg:text-base'>
              {isFinished
                ? `${homeGoals} - ${awayGoals}`
                : `${new Date(date).getHours().toString().padStart(2, '0')}:${new Date(date).getMinutes().toString().padStart(2, '0')}`}
            </span>

            <div className='flex flex-row-reverse items-center justify-start lg:flex-row lg:justify-end'>
              <span className='text-xs font-bold md:text-sm lg:text-base'>
                {homeTeamName}
              </span>
              <span>
                <img
                  src={homeTeamLogo}
                  className='mx-2 h-[25px] w-[25px] lg:h-[40px] lg:w-[40px]'
                  alt='홈팀로고'
                />
              </span>
            </div>

            <div className='flex flex-row-reverse items-center justify-start'>
              <span className='text-xs font-bold md:text-sm lg:text-base'>
                {awayTeamName}
              </span>
              <span>
                <img
                  src={awayTeamLogo}
                  className='mx-2 h-[25px] w-[25px] lg:h-[40px] lg:w-[40px]'
                  alt='어웨이팀로고'
                />
              </span>
            </div>
          </div>
          <div className='hidden text-sm font-semibold opacity-50 md:block'>
            {stadium}
          </div>
        </div>
      </Link>
    </li>
  );
}

export default MatchItem;

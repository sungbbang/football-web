import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { teamRecordQuery } from '../../query';

function TeamRecord({ selectedLeague, selectedSeason }) {
  const { data } = useSuspenseQuery(
    teamRecordQuery(selectedLeague, selectedSeason),
  );

  const recentForm = form => {
    return form.split('').map(c => {
      if (c === 'W') return '승';
      else if (c === 'L') return '패';
      else return '무';
    });
  };

  return (
    <div className='scrollbar-hide w-full overflow-x-auto'>
      <table className='min-w-full table-fixed rounded-lg text-sm whitespace-nowrap lg:text-lg'>
        <thead className='bg-stone-100 text-stone-500'>
          <tr>
            <th className='sticky left-0 z-10 w-[50%] bg-stone-100 p-3 text-left text-sm lg:text-lg'>
              순위
            </th>
            <th className='bg-stone-100 p-3 text-sm font-black text-blue-500 lg:text-lg'>
              승점
            </th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>경기</th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>승</th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>무</th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>패</th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>득점</th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>실점</th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>득실</th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>최근 5경기</th>
          </tr>
        </thead>
        <tbody>
          {data.result.length === 0 ? (
            <tr>
              <td colspan={10} className='py-4 text-center text-gray-500'>
                팀 순위정보가 없습니다.
              </td>
            </tr>
          ) : (
            data.result.map(item => (
              <tr className='border-b border-stone-300' key={item.teamId}>
                <td className='sticky left-0 z-10 bg-white p-3 text-left'>
                  <div className='flex items-center space-x-2 font-bold'>
                    <div className='min-w-[20px] text-center text-stone-500'>
                      {item.rank}
                    </div>
                    <img
                      src={item.teamLogo}
                      className='h-[20px] w-[20px] lg:h-[30px] lg:w-[30px]'
                    />
                    <span>{item.teamName}</span>
                  </div>
                </td>
                <td className='bg-white text-center font-black text-blue-500'>
                  {item.points}
                </td>
                <td className='bg-white text-center'>{item.played}</td>
                <td className='bg-white text-center'>{item.win}</td>
                <td className='bg-white text-center'>{item.draw}</td>
                <td className='bg-white text-center'>{item.lose}</td>
                <td className='bg-white text-center'>{item.goalsFor}</td>
                <td className='bg-white text-center'>{item.goalsAgainst}</td>
                <td className='bg-white text-center'>
                  {item.goalsFor - item.goalsAgainst}
                </td>
                <td className='bg-white text-center'>
                  {item.form === null ? 'X' : recentForm(item.form)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TeamRecord;

import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { topAssistorRecordQuery, topScorerRecordQuery } from '../../query';

function PlayerRecord({ tab, selectedLeague, selectedSeason }) {
  const isTopScorerTab = tab === 'topscorer';
  const { data } = useSuspenseQuery(
    isTopScorerTab
      ? topScorerRecordQuery(selectedLeague, selectedSeason)
      : topAssistorRecordQuery(selectedLeague, selectedSeason),
  );

  return (
    <div className='scrollbar-hide w-full overflow-x-auto'>
      <table className='min-w-full table-fixed rounded-lg text-sm whitespace-nowrap lg:text-lg'>
        <thead className='bg-stone-100 text-stone-500'>
          <tr>
            <th className='sticky left-0 z-10 w-[50%] bg-stone-100 p-3 text-left text-sm lg:text-lg'>
              순위
            </th>
            <th
              className={`bg-stone-100 p-3 text-sm ${isTopScorerTab && 'font-black text-blue-500'} lg:text-lg`}
            >
              득점
            </th>
            <th
              className={`bg-stone-100 p-3 text-sm ${!isTopScorerTab && 'font-black text-blue-500'} lg:text-lg`}
            >
              도움
            </th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>공격포인트</th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>경기</th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>
              출전시간(분)
            </th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>PK골</th>
            <th className='bg-stone-100 p-3 text-sm lg:text-lg'>키패스</th>
          </tr>
        </thead>
        <tbody>
          {data.result.length === 0 ? (
            <tr>
              <td colspan={8} className='py-4 text-center text-gray-500'>
                선수 순위정보가 없습니다.
              </td>
            </tr>
          ) : (
            data.result.map((item, idx) => (
              <tr className='border-b border-stone-300' key={item.playerName}>
                <td className='sticky left-0 z-10 bg-white p-3 text-left'>
                  <div className='flex items-center space-x-2 font-bold'>
                    <div className='min-w-[20px] text-center text-stone-500'>
                      {idx + 1}
                    </div>
                    <img
                      src={item.playerImg}
                      className='h-[20px] w-[20px] lg:h-[30px] lg:w-[30px]'
                    />
                    <span>{item.playerName}</span>
                  </div>
                </td>
                <td
                  className={`bg-white text-center ${isTopScorerTab && 'font-black text-blue-500'}`}
                >
                  {item.goals}
                </td>
                <td
                  className={`bg-white text-center ${!isTopScorerTab && 'font-black text-blue-500'}`}
                >
                  {item.assists}
                </td>
                <td className='bg-white text-center'>
                  {item.goals + item.assists}
                </td>
                <td className='bg-white text-center'>{item.games}</td>
                <td className='bg-white text-center'>{item.minutes}</td>
                <td className='bg-white text-center'>{item.pkGoals}</td>
                <td className='bg-white text-center'>
                  {item.keyPasses ? item.keyPasses : 0}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerRecord;

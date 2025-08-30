import React from 'react';

function MatchList({ matchList }) {
  const matchDate = new Date(matchList[0].date);
  const month = matchDate.getMonth() + 1;
  const date = matchDate.getDate();
  const day = matchDate.getDay();

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div>
      <div className='md:font-lg rounded-t-xl border border-gray-100 bg-gray-100 p-4 text-sm font-bold lg:text-xl'>
        {month}월 {date}일 ({days[day]})
      </div>
      <div className='rounded-b-xl border border-gray-100'>
        <ul>
          {matchList.map(item => {
            const {
              awayGoals,
              awayTeamLogo,
              awayTeamName,
              date,
              homeGoals,
              homeTeamLogo,
              homeTeamName,
              isFinished,
              stadium,
            } = item;

            const time = new Date(date);

            return (
              <div className='flex items-center justify-between border border-gray-50 p-4'>
                <div className='flex flex-col items-start space-y-2 lg:flex-row lg:items-center lg:space-y-0'>
                  <span className='rounded-lg border border-gray-300 px-3 text-center text-sm font-semibold lg:mr-4 lg:text-base'>
                    {isFinished
                      ? `${homeGoals} - ${awayGoals}`
                      : `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`}
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
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default MatchList;

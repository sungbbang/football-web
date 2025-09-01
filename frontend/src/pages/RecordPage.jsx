import React, { Suspense } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useScrollTab from '../hooks/useScrollTab';
import Loading from '../components/Loading/Loading';
import TeamRecord from '../components/Record/TeamRecord';
import PlayerRecord from '../components/Record/PlayRecord';

const selectedStyle = `aria-selected:font-semibold aria-selected:text-blue-500 aria-selected:underline aria-selected:underline-offset-6`;

const leagueItems = [
  { name: '프리미어리그', category: 'epl' },
  { name: '라리가', category: 'laliga' },
  { name: '분데스리가', category: 'bundesliga' },
  { name: '세리에A', category: 'serieA' },
  { name: '리그1', category: 'ligue1' },
];

const recordItems = [
  { name: '팀순위', tab: 'teamRank' },
  { name: '득점왕', tab: 'topscorer' },
  { name: '도움왕', tab: 'topassistor' },
];

function RecordPage() {
  const { selectedLeague, selectedSeason, selectedTab } = useLoaderData();
  const { setRef: setLeagueRef } = useScrollTab(selectedLeague);
  const navigate = useNavigate();

  return (
    <div className='mt-15 space-y-20'>
      <div className='mt-10 space-y-10'>
        <ul className='scrollbar-hide flex snap-x flex-nowrap gap-6 overflow-x-auto'>
          {leagueItems.map(item => (
            <li
              aria-selected={selectedLeague === item.category}
              key={item.name}
              className={`flex-shrink-0 text-base hover:text-blue-500 md:text-lg xl:text-xl ${selectedStyle} cursor-pointer`}
              ref={el => setLeagueRef(el, item.category)}
              onClick={() => navigate(`/record/${item.category}`)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className='mt-10 flex items-center justify-center text-2xl font-bold lg:text-3xl'>
          <button
            // disabled={!hasPrevSeason()}
            className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-20'
            // onClick={onClickPrevSeasonBtn}
          >
            &lt;
          </button>
          <span className='mx-5'>
            {selectedSeason &&
              `${selectedSeason}-${parseInt((selectedSeason + '').slice(2)) + 1}`}
          </span>
          <button
            // disabled={!hasNextSeason()}
            className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-20'
            // onClick={onClickNextSeasonBtn}
          >
            &gt;
          </button>
        </div>

        <ul className='flex justify-center gap-4 text-base lg:gap-10 lg:text-xl'>
          {recordItems.map((v, i) => (
            <li
              key={i}
              onClick={() => {
                navigate(
                  `/record/${selectedLeague}?season=${selectedSeason}&tab=${v.tab}`,
                );
              }}
              aria-selected={v.tab === selectedTab}
              className={`${selectedStyle} cursor-pointer text-base hover:text-blue-500 md:text-lg xl:text-xl`}
            >
              {v.name}
            </li>
          ))}
        </ul>

        <Suspense fallback={<Loading />}>
          {selectedTab === 'teamRank' ? (
            <TeamRecord
              selectedLeague={selectedLeague}
              selectedSeason={selectedSeason}
            />
          ) : (
            <PlayerRecord
              tab={selectedTab}
              selectedLeague={selectedLeague}
              selectedSeason={selectedSeason}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default RecordPage;

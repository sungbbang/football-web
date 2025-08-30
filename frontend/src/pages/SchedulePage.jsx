import React, { Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import OverallSchedule from '../components/Schedule/OverallSchedule';
import LeagueSchedule from '../components/Schedule/LeagueSchedule';
import useScrollTab from '../hooks/useScrollTab';
import Loading from '../components/Loading/Loading';

const selectedStyle = `aria-selected:font-semibold aria-selected:text-blue-500 aria-selected:underline aria-selected:underline-offset-6`;

const leagueItems = [
  { name: '전체', category: null },
  { name: '프리미어리그', category: 'epl' },
  { name: '라리가', category: 'laliga' },
  { name: '분데스리가', category: 'bundesliga' },
  { name: '세리에A', category: 'serieA' },
  { name: '리그1', category: 'ligue1' },
];

function SchedulePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDate = searchParams.get('date');
  const selectedCategory = searchParams.get('category');
  const { setRef: setCategoryRef } = useScrollTab(selectedCategory);

  const onClickLeagueItem = category => {
    if (!category) {
      navigate('/schedule');
    } else {
      navigate(`/schedule?category=${category}`);
    }
  };

  return (
    <div className='mt-15 space-y-20'>
      <div>
        <ul className='scrollbar-hide flex snap-x flex-nowrap gap-6 overflow-x-auto'>
          {leagueItems.map(item => (
            <li
              ref={el => setCategoryRef(el, item.category)}
              aria-selected={item.category === selectedCategory}
              key={item.name}
              onClick={() => onClickLeagueItem(item.category)}
              className={`flex-shrink-0 text-base hover:text-blue-500 md:text-lg xl:text-xl ${selectedStyle} cursor-pointer`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className='mt-10 space-y-10'>
          {!selectedCategory ? (
            <Suspense fallback={<Loading />}>
              <OverallSchedule selectedDate={selectedDate} />
            </Suspense>
          ) : (
            <Suspense fallback={<Loading />}>
              <LeagueSchedule
                selectedDate={selectedDate}
                selectedCategory={selectedCategory}
              />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;

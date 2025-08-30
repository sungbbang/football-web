import { useSuspenseQuery } from '@tanstack/react-query';
import { dateRangeQuery, monthlyScheduleQuery } from '../../query';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import useScrollTab from '../../hooks/useScrollTab';
import MatchItem from './MatchItem';

const selectedStyle = `aria-selected:font-semibold aria-selected:text-blue-500 aria-selected:underline aria-selected:underline-offset-6`;

function OverallSchedule({ selectedDate }) {
  const nav = useNavigate();
  const [year, month, day] = selectedDate.split('-').map(Number);
  const { setRef: setDayRef } = useScrollTab(new Date(selectedDate).getDate());

  const { data: dateRange } = useSuspenseQuery(dateRangeQuery());
  const { data: scheduleData } = useSuspenseQuery(
    monthlyScheduleQuery(selectedDate),
  );

  const { minDate, maxDate } = dateRange.result;
  const min_date = new Date(minDate);
  const max_date = new Date(maxDate);

  const { schedule } = scheduleData.result;

  const datesOfMonth = useMemo(
    () =>
      Array.from(
        { length: new Date(year, month, 0).getDate() },
        (_, i) => i + 1,
      ),
    [year, month],
  );

  const filteredSchedule = useMemo(
    () =>
      schedule.filter(match => {
        const matchDate = new Date(match.date);
        const matchYear = matchDate.getFullYear();
        const matchMonth = matchDate.getMonth() + 1;
        const matchDay = matchDate.getDate();

        return year === matchYear && month === matchMonth && day === matchDay;
      }),
    [schedule, year, month, day],
  );

  const onClickDateItem = d => {
    const newDate = new Date(selectedDate);
    newDate.setDate(d);
    nav(`/schedule?date=${formatDate(newDate)}`);
  };

  const hasMatchOnDate = d => {
    return schedule.some(match => {
      const matchDate = new Date(match.date);
      return matchDate.getDate() === d;
    });
  };

  const onClickPrevMonthBtn = () => {
    const [y, m] = selectedDate.split('-').map(Number);
    const newDate = new Date(y, m - 1, 0);
    console.log(newDate);
    if (min_date <= newDate) {
      console.log('ok');
      nav(`/schedule?date=${formatDate(newDate)}`);
    }
  };

  const onClickNextMonthBtn = () => {
    const [y, m] = selectedDate.split('-').map(Number);
    const newDate = new Date(y, m, 1);
    if (newDate <= max_date) {
      nav(`/schedule?date=${formatDate(newDate)}`);
    }
  };

  const isPrevBtnDisable = selectedDate => {
    const [y, m] = selectedDate.split('-').map(Number);

    const old_y = min_date.getFullYear();
    const old_m = min_date.getMonth() + 1;

    if (y < old_y) {
      return true;
    }

    if (y === old_y && m <= old_m) {
      return true;
    }

    return false;
  };

  const isNextBtnDisable = selectedDate => {
    const [y, m] = selectedDate.split('-').map(Number);

    const new_y = max_date.getFullYear();
    const new_m = max_date.getMonth() + 1;

    if (y > new_y) {
      return true;
    }

    if (y === new_y && m >= new_m) {
      return true;
    }

    return false;
  };

  return (
    <>
      <div className='flex items-center justify-center text-2xl font-bold lg:text-3xl'>
        <button
          disabled={isPrevBtnDisable(selectedDate)}
          onClick={onClickPrevMonthBtn}
          className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-20'
        >
          &lt;
        </button>
        <span className='mx-5'>
          {`${selectedDate.split('-')[0]}-${selectedDate.split('-')[1].padStart(2, '0')}`}
        </span>
        <button
          disabled={isNextBtnDisable(selectedDate)}
          onClick={onClickNextMonthBtn}
          className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-20'
        >
          &gt;
        </button>
      </div>

      <div>
        <ul className='scrollbar-hide flex snap-x flex-nowrap gap-6 overflow-x-auto'>
          {datesOfMonth.map((d, i) => {
            const hasMatch = hasMatchOnDate(d);
            return (
              <li
                ref={el => {
                  setDayRef(el, d);
                }}
                key={i}
                aria-selected={d === new Date(selectedDate).getDate()}
                onClick={() => {
                  if (hasMatch) {
                    onClickDateItem(d);
                  }
                }}
                className={
                  `flex-shrink-0 text-base font-bold xl:text-xl ${selectedStyle} ` +
                  (hasMatch
                    ? 'cursor-pointer hover:text-blue-500'
                    : 'cursor-default opacity-25')
                }
              >
                {d}일
              </li>
            );
          })}
        </ul>
      </div>

      {filteredSchedule.length === 0 ? (
        <div className='py-30 text-center opacity-50'>
          해당 일자에는 경기가 없습니다.
        </div>
      ) : (
        <div>
          <ul className='space-y-6'>
            {filteredSchedule.map(item => (
              <MatchItem key={item.fixtureId} {...item} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default OverallSchedule;

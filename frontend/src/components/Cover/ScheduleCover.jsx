import React from 'react';
import footballImg from '../../assets/football.svg';
import { Link } from 'react-router-dom';

function ScheduleCover() {
  return (
    <div className='flex flex-col items-center justify-between gap-8 md:gap-16 lg:flex-row'>
      <div className='flex-1 space-y-6 text-center lg:text-right'>
        <h1 className='text-3xl font-bold xl:text-4xl'>
          오늘은 어떤 경기가 있을까요?
        </h1>
        <p className='text-lg sm:text-xl'>
          당신이 좋아하는 리그의 일정을 지금 확인해보세요.
        </p>
        <Link to='/schedule'>
          <button className='rounded-lg bg-blue-400 px-4 py-2 text-xl font-semibold text-white transition duration-300 hover:bg-blue-500'>
            일정 보러가기
          </button>
        </Link>
      </div>
      <div className='w-full max-w-2xl flex-1 lg:max-w-none'>
        <div className='relative'>
          <img
            src={footballImg}
            alt=''
            className='relative w-full transform rounded-2xl object-cover shadow-2xl transition-transform duration-300 hover:scale-[1.02]'
          />
        </div>
      </div>
    </div>
  );
}

export default ScheduleCover;

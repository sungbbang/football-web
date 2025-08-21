import React from 'react';
import playerImg from '../../assets/player.svg';
import { Link } from 'react-router-dom';

function RecordCover() {
  return (
    <div className='flex flex-col items-center justify-between gap-8 md:gap-16 lg:flex-row-reverse'>
      <div className='flex-1 space-y-6 text-center lg:text-left'>
        <h1 className='text-3xl font-bold xl:text-4xl'>
          누가 가장 골을 많이 넣었나요?
        </h1>
        <p className='text-lg sm:text-xl'>
          선수들의 스탯과 리그 순위 정보를 제공해요.
        </p>
        <Link to='/record'>
          <button className='rounded-lg bg-blue-400 px-4 py-2 text-xl font-semibold text-white transition duration-300 hover:bg-blue-500'>
            순위 보러가기
          </button>
        </Link>
      </div>
      <div className='w-full max-w-2xl flex-1 lg:max-w-none'>
        <img
          src={playerImg}
          alt=''
          className='relative w-full transform rounded-2xl object-cover shadow-2xl transition-transform duration-300 hover:scale-[1.02]'
        />
      </div>
    </div>
  );
}

export default RecordCover;

import React from 'react';
import talkingImg from '../../assets/talking.svg';
import { Link } from 'react-router-dom';

function BoardCover() {
  return (
    <div className='flex flex-col items-center justify-between gap-8 md:gap-16 lg:flex-row'>
      <div className='flex-1 space-y-6 text-center lg:text-right'>
        <h1 className='text-3xl font-bold xl:text-4xl'>
          응원하는 팀이 이겼나요?
        </h1>
        <p className='text-lg sm:text-xl'>
          사람들과 이런저런 이야기를 나눌 수 있어요.
        </p>
        <Link to='/board'>
          <button className='rounded-lg bg-blue-400 px-4 py-2 text-xl font-semibold text-white transition duration-300 hover:bg-blue-500'>
            게시판 가기
          </button>
        </Link>
      </div>
      <div className='w-full max-w-2xl flex-1 lg:max-w-none'>
        <img
          src={talkingImg}
          alt=''
          className='relative w-full transform rounded-2xl object-cover shadow-2xl transition-transform duration-300 hover:scale-[1.02]'
        />
      </div>
    </div>
  );
}

export default BoardCover;

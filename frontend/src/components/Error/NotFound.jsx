import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='flex min-h-dvh flex-col items-center justify-center space-y-10'>
      <h2 className='text-xl lg:text-2xl'>404 | 페이지를 찾을 수 없습니다.</h2>
      <button
        className='cursor-pointer rounded-lg border p-3 hover:bg-gray-400 hover:text-white'
        onClick={() => navigate('/', { replace: true })}
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}

export default NotFound;

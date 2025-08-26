import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const navigate = useNavigate();

  const handleLogOut = async () => {};

  const user = {
    username: 'abc@abc.com',
    nickname: 'nickname',
  };

  return (
    <>
      <div className='pt-8'>
        <div className='mb-8 flex items-center justify-between border-b border-gray-200 pb-4'>
          <h1 className='text-left text-2xl font-bold text-gray-800 md:text-3xl'>
            마이페이지
          </h1>
          <button
            onClick={handleLogOut}
            className='text-md rounded-lg border border-blue-500 px-5 py-2 font-medium text-blue-500 transition duration-300 hover:bg-blue-500 hover:text-white'
          >
            로그아웃
          </button>
        </div>

        <div className='rounded-lg border border-gray-100 bg-white p-6 shadow-md'>
          <p className='mb-4 text-xl font-semibold text-gray-700 md:text-2xl'>
            환영합니다, <span className='text-blue-600'>{user.nickname}</span>
            님!
          </p>
          <div className='space-y-3 text-lg text-gray-600'>
            <p>
              <span className='font-medium text-gray-700'>이메일:</span>{' '}
              {user.username}
            </p>
          </div>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md'>
            <h2 className='mb-3 text-xl font-semibold text-gray-800'>
              나의 게시글
            </h2>
            <p className='text-base text-gray-600'>
              작성하신 게시글 목록을 확인하고 관리할 수 있습니다.
            </p>
            <button
              onClick={() => navigate('/my/post')}
              className='mt-5 rounded-md bg-gray-100 px-5 py-2 text-sm transition-colors duration-300 hover:bg-gray-200'
            >
              게시글 관리
            </button>
          </div>

          <div className='rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md'>
            <h2 className='mb-3 text-xl font-semibold text-gray-800'>
              나의 댓글
            </h2>
            <p className='text-base text-gray-600'>
              작성하신 댓글 목록을 확인하고 관리할 수 있습니다.
            </p>
            <button
              onClick={() => navigate('/my/comment')}
              className='mt-5 rounded-md bg-gray-100 px-5 py-2 text-sm transition-colors duration-300 hover:bg-gray-200'
            >
              댓글 관리
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;

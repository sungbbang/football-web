import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmitLogin = async e => {
    e.preventDefault();
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-white px-4'>
      <div className='w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-semibold text-gray-900'>
            로그인
          </h2>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmitLogin}>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='text-xm block font-medium text-gray-700'
              >
                이메일
              </label>
              <input
                id='email'
                type='email'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                placeholder='이메일'
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='text-xm block font-medium text-gray-700'
              >
                비밀번호
              </label>
              <input
                id='password'
                type='password'
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                placeholder='비밀번호'
              />
            </div>
          </div>

          {/* error handliing */}

          <div className='flex justify-center'>
            <span
              className='cursor-pointer text-gray-500 underline underline-offset-6'
              onClick={() => navigate('/signup')}
            >
              회원가입
            </span>
          </div>

          <button
            type='submit'
            className='w-full items-center rounded-lg border-transparent bg-blue-500 px-4 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-600'
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

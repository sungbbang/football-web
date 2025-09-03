import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../api/user';
import { useUser } from '../contexts/UserContext';

function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmitLogin = async e => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await signIn(formData);
      login(response.result);
      alert('로그인되었습니다.');
      navigate(-1, { replace: true });
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response.data.message || '로그인에 실패했습니다.';
      const remainingAttempts = error.response.data.remainingAttempts;

      setError({
        message: errorMessage,
        remainingAttempts: remainingAttempts,
      });
    }
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
                ref={emailRef}
                id='email'
                type='email'
                required
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
                ref={passwordRef}
                id='password'
                type='password'
                required
                className='mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                placeholder='비밀번호'
              />
            </div>
          </div>

          {error && (
            <div className='rounded-lg bg-red-50 p-4 text-center text-base font-bold text-red-500'>
              {typeof error === 'string' ? error : error.message}
              {error.remainingAttempts !== undefined && (
                <div className='mt-1'>
                  남은 시도 횟수: {error.remainingAttempts}회
                </div>
              )}
            </div>
          )}

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

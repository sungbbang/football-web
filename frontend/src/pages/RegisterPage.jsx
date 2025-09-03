import React, { useState } from 'react';
import { PiCheck } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/user';

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
  });
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState(null);

  const handleSubmitForm = async e => {
    e.preventDefault();

    if (formData.password !== passwordCheck) {
      return setError('비밀번호가 일치하지 않습니다.');
    }

    try {
      setError(null);
      await signUp(formData);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-10'>
        <h1 className='text-2xl font-bold lg:text-3xl'>회원가입</h1>

        <form className='mb-10 w-full max-w-sm' onSubmit={handleSubmitForm}>
          <div className='flex flex-col space-y-5'>
            <div className='space-y-1.5'>
              <label className='mb-1.5 block'>이메일</label>
              <input
                value={formData.email}
                onChange={e => {
                  setFormData({ ...formData, email: e.target.value });
                  setError(null);
                }}
                type='email'
                placeholder='이메일'
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2'
              />
            </div>

            <div className='space-y-1.5'>
              <label className='mb-1.5 block'>비밀번호</label>
              <input
                minLength={8}
                maxLength={27}
                value={formData.password}
                onChange={e => {
                  setFormData({ ...formData, password: e.target.value });
                  setError(null);
                }}
                type='password'
                placeholder='비밀번호'
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2'
              />
              <div className='flex items-center gap-2 text-gray-500'>
                <PiCheck />
                <p className='text-sm'>8자 이상 27자 이하 입력 (공백 제외)</p>
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='mb-1.5 block'>비밀번호 확인</label>
              <input
                minLength={8}
                maxLength={27}
                value={passwordCheck}
                onChange={e => {
                  setPasswordCheck(e.target.value);
                  setError(null);
                }}
                type='password'
                placeholder='비밀번호 확인'
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2'
              />
            </div>

            <div className='space-y-1.5'>
              <label className='mb-1.5 block'>닉네임</label>
              <input
                maxLength={6}
                value={formData.nickname}
                onChange={e => {
                  const value = e.target.value;
                  if (value.length > 6) {
                    setError('닉네임은 최대 6글자까지만 입력할 수 있습니다.');
                    return;
                  }
                  setFormData({ ...formData, nickname: value });
                  setError(null);
                }}
                type='text'
                placeholder='닉네임'
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2'
              />
              <div className='flex items-center gap-2 text-gray-500'>
                <PiCheck />
                <p className='text-sm'>최대 한글 6글자</p>
              </div>
            </div>

            {error && (
              <p className='rounded bg-red-100 px-3 py-2 text-sm text-red-600'>
                {error}
              </p>
            )}

            <button
              type='submit'
              className='rounded-lg border border-blue-500 bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { userPostsQuery } from '../query';
import { formatPostDate } from '../utils/formatPostDate';

function UserPostPage() {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');

  const { data: userPostData } = useSuspenseQuery(userPostsQuery());

  const userPosts = userPostData.result;
  const filteredPosts = useMemo(() => {
    return userPosts.filter(post => {
      const value = post[searchType].toLowerCase() || '';
      return value.includes(searchTerm.toLowerCase());
    });
  }, [userPosts, searchTerm, searchType]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  const totalPages =
    pageSize > 0 ? Math.ceil(filteredPosts.length / pageSize) : 1;

  return (
    <div className='mt-15'>
      <button
        onClick={() => navigate(-1)}
        className='mb-5 rounded-lg border border-gray-300 bg-gray-300 px-2 py-1 text-sm hover:border-blue-500 hover:bg-blue-500 hover:text-white md:text-base'
      >
        뒤로 가기
      </button>
      <div className='mb-10 flex items-center justify-between'>
        <h1 className='text-left text-xl font-bold md:text-2xl lg:text-3xl'>
          나의 게시글
        </h1>
      </div>

      <div className='mb-5 flex items-center space-x-2'>
        <label className='text-base font-bold text-gray-500'>
          페이지당 표시
        </label>
        <select
          className='rounded border px-3 py-2'
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[10, 25, 50].map(size => (
            <option key={size} value={size}>{`${size}개`}</option>
          ))}
        </select>
      </div>

      <div className='mb-4 flex w-full gap-2 md:w-auto'>
        <select
          value={searchType}
          className='rounded border px-3 py-2 text-base'
          onChange={e => setSearchType(e.target.value)}
        >
          <option value='title'>제목</option>
          <option value='content'>내용</option>
        </select>
        <div className='flex-1 md:w-80'>
          <input
            type='text'
            placeholder='검색어를 입력하세요'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='w-full rounded border px-3 py-2 text-base'
          />
        </div>
      </div>

      <div className='mb-10 hidden overflow-x-auto rounded border lg:block'>
        <table className='min-w-full bg-white'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-4 text-center text-sm font-medium tracking-wider text-gray-500 uppercase'>
                번호
              </th>
              <th className='w-[50%] py-4 text-left text-sm font-medium tracking-wider text-gray-500 uppercase'>
                제목
              </th>
              <th className='py-4 text-center text-sm font-medium tracking-wider text-gray-500 uppercase'>
                글쓴이
              </th>
              <th className='py-4 text-center text-sm font-medium tracking-wider text-gray-500 uppercase'>
                작성일
              </th>
              <th className='py-4 text-center text-sm font-medium tracking-wider text-gray-500 uppercase'>
                조회
              </th>
              <th className='py-4 text-center text-sm font-medium tracking-wider text-gray-500 uppercase'>
                추천
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {paginatedPosts.length === 0 ? (
              <tr>
                <td colSpan='6' className='py-4 text-center text-gray-500'>
                  아직 게시글이 없습니다.
                </td>
              </tr>
            ) : (
              paginatedPosts.map(post => (
                <tr
                  key={post._id}
                  className='cursor-pointer hover:bg-gray-50'
                  onClick={() => navigate(`/board/${post._id}`)}
                >
                  <td className='py-2 text-center text-sm whitespace-nowrap'>
                    {post.number}
                  </td>
                  <td className='py-2 text-sm whitespace-nowrap'>
                    {post.title}
                  </td>
                  <td className='py-2 text-center text-sm whitespace-nowrap'>
                    {post.authorNickname}
                  </td>
                  <td className='py-2 text-center text-xs whitespace-nowrap'>
                    {formatPostDate(new Date(post.createdAt))}
                  </td>
                  <td className='py-2 text-center text-xs whitespace-nowrap'>
                    {post.views}
                  </td>
                  <td className='py-2 text-center text-xs whitespace-nowrap'>
                    {post.likes}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ul className='mb-10 lg:hidden'>
        {paginatedPosts.length === 0 ? (
          <div className='text-center opacity-50'>아직 게시글이 없습니다.</div>
        ) : (
          paginatedPosts.map(post => (
            <li key={post._id}>
              <div className='border-b border-gray-300 p-2'>
                <Link to={`/board/${post._id}`} className='space-y-1'>
                  <div className='flex justify-between'>
                    <span className='text-sm'>
                      {post.title.length <= 20
                        ? post.title
                        : post.title.substring(0, 20) + '…'}
                    </span>
                  </div>
                  <ul className='flex text-xs opacity-50'>
                    <li className="after:mx-1 after:content-['|']">
                      {formatPostDate(new Date(post.createdAt))}
                    </li>
                    <li className="after:mx-1 after:content-['|']">
                      조회 {post.views}
                    </li>
                    <li className="after:mx-1 after:content-['|']">
                      추천 {post.likes}
                    </li>
                    <li>댓글 {post.comments ? post.comments : 0}개</li>
                  </ul>
                </Link>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className='mt-4 flex justify-center space-x-2 text-lg font-bold'>
        <button
          className='rounded border px-3 py-1 disabled:opacity-50'
          onClick={() => setCurrentPage(p => p - 1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          이전
        </button>
        <span className='px-3 py-1'>
          {totalPages > 0 ? `${currentPage} / ${totalPages}` : '0 / 0'}
        </span>
        <button
          className='rounded border px-3 py-1 disabled:opacity-50'
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage >= totalPages || totalPages === 0}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default UserPostPage;

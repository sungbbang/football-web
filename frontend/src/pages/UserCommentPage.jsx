import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { userCommentsQuery } from '../query';
import { formatPostDate } from '../utils/formatPostDate';

function UserCommentPage() {
  const navigate = useNavigate();
  const { data: userCommentData } = useSuspenseQuery(userCommentsQuery());
  const myComments = userCommentData.result;

  return (
    <div className='mt-15'>
      <button
        onClick={() => navigate('/my')}
        className='mb-5 rounded-lg border border-gray-300 bg-gray-300 px-2 py-1 text-sm hover:border-blue-500 hover:bg-blue-500 hover:text-white md:text-base'
      >
        마이페이지
      </button>
      <div className='mb-10 flex items-center justify-between'>
        <h1 className='text-left text-xl font-bold md:text-2xl lg:text-3xl'>
          나의 댓글
        </h1>
      </div>

      <div className='mb-10 hidden md:block'>
        <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {myComments.length === 0 ? (
            <div className='col-span-full py-4 text-center text-gray-500'>
              아직 작성한 댓글이 없습니다.
            </div>
          ) : (
            myComments.map(comment => (
              <li
                key={comment._id}
                className='rounded border p-4 shadow-sm transition-shadow hover:bg-gray-100 hover:shadow-md'
              >
                <Link to={`/board/${comment.postId}`}>
                  <div className='mb-2'>
                    <p className='text-base font-semibold break-words text-gray-800'>
                      {comment.content.length > 100
                        ? comment.content.substring(0, 100) + '...'
                        : comment.content}
                    </p>

                    <span className='text-xs text-gray-300'>
                      {formatPostDate(new Date(comment.createdAt))}
                    </span>
                  </div>

                  <div className='mt-2 border-t border-gray-200 pt-2'>
                    <h3 className='text-xs font-bold'>
                      제목: {comment.postTitle}
                    </h3>
                    <span className='text-xs text-gray-500'>
                      작성: {comment.postAuthor}
                    </span>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      <ul className='mb-10 md:hidden'>
        {myComments.length === 0 ? (
          <div className='text-center opacity-50'>
            아직 작성한 댓글이 없습니다.
          </div>
        ) : (
          myComments.map(comment => (
            <li key={comment._id}>
              <div className='border-b border-gray-300 p-2'>
                <Link to={`/board/${comment.postId}`} className='space-y-1'>
                  <div className='flex justify-between'>
                    <span className='text-sm'>
                      {comment.content.length <= 20
                        ? comment.content
                        : comment.content.substring(0, 20) + '…'}
                    </span>
                  </div>
                  <ul className='flex text-xs opacity-50'>
                    <li className="after:mx-1 after:content-['|']">
                      {formatPostDate(new Date(comment.createdAt))}
                    </li>
                    <li>{comment.postAuthor}</li>
                  </ul>
                </Link>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default UserCommentPage;

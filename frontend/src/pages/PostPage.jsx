import React, { useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { postQuery } from '../query';
import { useUser } from '../contexts/UserContext';
import { formatPostDate } from '../utils/formatPostDate';

function PostPage() {
  const navigate = useNavigate();
  const { postId } = useLoaderData();
  const { data: postData } = useSuspenseQuery(postQuery(postId));
  const post = postData.result;

  const [currentPostData, setCurrentPostData] = useState(post);
  const commentRef = useRef(null);
  const { user } = useUser();
  const [commentList, setCommentList] = useState([]);
  const [isLike, setIsLike] = useState(post.likedUsers.includes(user._id));
  const [displayLikeCount, setDisplayLikeCount] = useState(post.likesCount);
  const [displayCommentsCount, setDisplayCommentsCount] = useState(
    post.commentsCount,
  );

  return (
    <div className='mt-15'>
      <button
        onClick={() => navigate(-1)}
        className='mb-5 rounded-lg border border-gray-300 bg-gray-300 px-2 py-1 text-sm hover:border-blue-500 hover:bg-blue-500 hover:text-white md:text-base'
      >
        목록 돌아가기
      </button>
      <div className='relative space-y-4 pb-4 after:absolute after:bottom-0 after:left-0 after:block after:h-px after:w-full after:bg-gray-300 after:content-[""]'>
        <h1 className='text-lg font-bold tracking-wide md:text-xl'>
          {currentPostData.title}
        </h1>
        <ul className='flex gap-4 text-xs md:text-base'>
          <li>{currentPostData.authorNickname}</li>
          <li>{formatPostDate(currentPostData.createdAt)}</li>
        </ul>
      </div>
      <ul className='flex py-4 text-xs md:mb-4 md:text-base'>
        <li className="after:mx-1 after:content-['|']">
          조회 {currentPostData.views}
        </li>
        <li className="after:mx-1 after:content-['|']">
          추천 {displayLikeCount}
        </li>
        <li>댓글 {displayCommentsCount}</li>
      </ul>
      <article className='prose lg:prose-xl min-h-44'>
        <div
          dangerouslySetInnerHTML={{ __html: currentPostData.content }}
          className='text-lg md:text-xl'
        ></div>
      </article>

      {user._id === currentPostData.authorId ? (
        <div className='space-x-2 text-right'>
          <button
            onClick={() => navigate(`/edit-post/${currentPostData._id}`)}
            className='mb-5 rounded-lg border border-blue-400 bg-blue-400 px-4 py-1 text-sm text-white hover:border-blue-500 hover:bg-blue-500 md:text-base'
          >
            수정
          </button>
          <button className='mb-5 rounded-lg border border-red-400 bg-red-400 px-4 py-1 text-sm text-white hover:border-red-500 hover:bg-red-500 md:text-base'>
            삭제
          </button>
        </div>
      ) : (
        <div className='text-right'>
          <button className='mb-5 rounded-lg border border-red-400 bg-red-400 px-3 py-1 text-sm text-white hover:border-red-500 hover:bg-red-500 md:text-base'>
            {isLike ? '추천취소' : '추천하기'}
          </button>
        </div>
      )}

      <form className='mt-10'>
        <textarea
          ref={commentRef}
          required
          placeholder='댓글을 입력해주세요'
          className='h-[100px] w-full resize-none rounded border p-2 md:text-lg'
        />

        <div className='text-right'>
          <button
            type='submit'
            className='mb-5 rounded-lg bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 md:text-base'
          >
            댓글등록
          </button>
        </div>
      </form>

      <div>
        <div className='font-bold md:text-2xl'>
          댓글 {displayCommentsCount}개
        </div>
        <ul className='mt-4'>
          {commentList.map(comment => (
            <li>comment</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostPage;

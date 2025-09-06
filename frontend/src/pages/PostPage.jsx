import React, { Suspense, useRef } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { postQuery } from '../query';
import { useUser } from '../contexts/UserContext';
import { formatPostDate } from '../utils/formatPostDate';
import Loading from '../components/Loading/Loading';
import { useLikePostMutation } from '../hooks/useLikePostMutation';
import { useDeletePostMutation } from '../hooks/useDeletePostMutation';
import { useCreateCommentMutation } from '../hooks/useCreateCommentMutation';
import CommentList from '../components/Comment/CommentList';

function PostPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { postId } = useLoaderData();
  const { data: postData } = useSuspenseQuery(postQuery(postId));
  const post = postData.result;

  const isLike = post.likedUsers.includes(user?._id);
  const commentRef = useRef(null);
  const { mutate: likeMutate } = useLikePostMutation(postId, user?._id);
  const { mutate: deleteMutate } = useDeletePostMutation(postId);
  const { mutate: createCommentMutate } = useCreateCommentMutation(
    postId,
    commentRef,
  );

  const onSubmitCommentForm = async e => {
    e.preventDefault();

    const commentContent = commentRef.current.value;

    if (!commentContent) {
      alert('댓글 내용을 입력해주세요.');
      commentRef.current.focus();
      return;
    }

    const commentData = { content: commentContent };

    createCommentMutate(commentData);
  };

  return (
    <div className='mt-15'>
      <button
        onClick={() => navigate(-1)}
        className='mb-5 rounded-lg border border-gray-300 bg-gray-300 px-2 py-1 text-sm hover:border-blue-500 hover:bg-blue-500 hover:text-white md:text-base'
      >
        뒤로 가기
      </button>
      <div className='relative space-y-4 pb-4 after:absolute after:bottom-0 after:left-0 after:block after:h-px after:w-full after:bg-gray-300 after:content-[""]'>
        <h1 className='text-lg font-bold tracking-wide md:text-xl'>
          {post.title}
        </h1>
        <ul className='flex gap-4 text-xs md:text-base'>
          <li>{post.authorNickname}</li>
          <li>{formatPostDate(post.createdAt)}</li>
        </ul>
      </div>
      <ul className='flex py-4 text-xs md:mb-4 md:text-base'>
        <li className="after:mx-1 after:content-['|']">조회 {post.views}</li>
        <li className="after:mx-1 after:content-['|']">
          추천 {post.likesCount}
        </li>
        <li>댓글 {post.commentsCount}</li>
      </ul>
      <article className='prose lg:prose-xl min-h-44'>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className='text-lg md:text-xl'
        ></div>
      </article>

      {user && user._id === post.authorId ? (
        <div className='space-x-2 text-right'>
          <button
            onClick={() => navigate(`/edit-post/${post._id}`)}
            className='mb-5 rounded-lg border border-blue-400 bg-blue-400 px-4 py-1 text-sm text-white hover:border-blue-500 hover:bg-blue-500 md:text-base'
          >
            수정
          </button>
          <button
            onClick={() => {
              if (window.confirm('게시글을 삭제하시겠습니까?')) {
                deleteMutate();
              }
            }}
            className='mb-5 rounded-lg border border-red-400 bg-red-400 px-4 py-1 text-sm text-white hover:border-red-500 hover:bg-red-500 md:text-base'
          >
            삭제
          </button>
        </div>
      ) : (
        <div className='text-right'>
          <button
            onClick={() => {
              if (!user) {
                alert('로그인 후 이용 가능합니다');
                return;
              }
              likeMutate();
            }}
            className='mb-5 rounded-lg border border-red-400 bg-red-400 px-3 py-1 text-sm text-white hover:border-red-500 hover:bg-red-500 md:text-base'
          >
            {isLike ? '추천취소' : '추천하기'}
          </button>
        </div>
      )}

      <form onSubmit={onSubmitCommentForm} className='mt-10'>
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
        <div className='font-bold md:text-2xl'>댓글 {post.commentsCount}개</div>
        <Suspense fallback={<Loading />}>
          <CommentList postId={postId} />
        </Suspense>
      </div>
    </div>
  );
}

export default PostPage;

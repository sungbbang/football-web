import React from 'react';
import { Link } from 'react-router-dom';
import { formatPostDate } from '../../utils/formatPostDate';

function PostItem({ post }) {
  return (
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
              추천 {post.likesCount}
            </li>
            <li>댓글 {post.commentsCount}</li>
          </ul>
        </Link>
      </div>
    </li>
  );
}

export default PostItem;

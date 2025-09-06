import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { commentsQuery } from '../../query';
import CommentItem from './CommentItem';

function CommentList({ postId }) {
  const { data: commentsData } = useSuspenseQuery(commentsQuery(postId));
  const comments = commentsData.result;

  return (
    <>
      <ul>
        {comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={postId} />
        ))}
      </ul>
    </>
  );
}

export default CommentList;

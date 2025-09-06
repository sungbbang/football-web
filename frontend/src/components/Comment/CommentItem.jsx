import React, { useEffect, useRef, useState } from 'react';
import { formatPostDate } from '../../utils/formatPostDate';
import { useUser } from '../../contexts/UserContext';
import { useEditCommentMutation } from '../../hooks/useEditCommentMutation';
import { useDeleteCommentMutation } from '../../hooks/useDeleteCommentMutation';

function CommentItem({ comment, postId }) {
  const { user } = useUser();
  const isAuthor =
    user && comment.authorId && String(user._id) === String(comment.authorId);

  const [editedContent, setEditedContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const editFormRef = useRef(null);

  const { mutate: editCommentMutate } = useEditCommentMutation(
    comment._id,
    postId,
  );
  const { mutate: deleteCommentMutate } = useDeleteCommentMutation(
    comment._id,
    postId,
  );

  useEffect(() => {
    if (isEditing && editFormRef.current) {
      editFormRef.current.focus();
    }
  }, [isEditing]);

  const toggleEditClick = () => {
    setIsEditing(prev => !prev);
  };

  const handleSubmitEditComment = async e => {
    e.preventDefault();

    if (editedContent.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    if (editedContent.trim() === comment.content.trim()) {
      alert('변경된 내용이 없습니다.');
      setIsEditing(false);
      return;
    }
    const editCommentData = {
      content: editedContent,
    };

    editCommentMutate(editCommentData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  return (
    <li className='border-t border-gray-300 py-2 last:border-b'>
      <div className='flex flex-col space-y-1'>
        <span className='text-sm md:pr-10 md:text-lg'>
          {comment.authorNickname}
        </span>
        {isEditing ? (
          <form onSubmit={handleSubmitEditComment}>
            <textarea
              ref={editFormRef}
              className='h-[100px] w-full resize-none rounded border p-2 md:text-lg'
              value={editedContent}
              onChange={e => setEditedContent(e.target.value)}
            />
            <div className='space-x-2 text-right'>
              <button
                type='submit'
                className='rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600'
              >
                저장
              </button>
              <button
                type='button'
                onClick={toggleEditClick}
                className='rounded bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-500'
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <p className='text-sm md:text-lg'>{comment.content}</p>
        )}
      </div>
      <div className='flex justify-between text-xs text-gray-500 md:text-sm'>
        <span className=''>{formatPostDate(new Date(comment.createdAt))}</span>
        {isAuthor && !isEditing && (
          <span className='space-x-2'>
            <button
              onClick={toggleEditClick}
              className='hover:font-bold hover:text-gray-800'
            >
              수정
            </button>
            <button
              onClick={() => {
                if (window.confirm('댓글을 삭제하시겠습니까?')) {
                  deleteCommentMutate();
                }
              }}
              className='hover:font-bold hover:text-gray-800'
            >
              삭제
            </button>
          </span>
        )}
      </div>
    </li>
  );
}

export default CommentItem;

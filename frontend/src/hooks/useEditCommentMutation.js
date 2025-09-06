import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editComment } from '../api/comment'; // axios patch 함수

export function useEditCommentMutation(commentId, postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentData => editComment(commentId, commentData),
    onMutate: async commentData => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });

      const previousComments = queryClient.getQueryData({
        queryKey: ['comments', postId],
      });

      queryClient.setQueryData({ queryKey: ['comments', postId] }, old => {
        if (!old) return old;
        return {
          ...old,
          result: old.result.map(c =>
            c._id === commentId ? { ...c, commentData } : c,
          ),
        };
      });

      return { previousComments };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        { queryKey: ['comments', postId] },
        context.previousComments,
      );
      alert('댓글 수정에 실패했습니다.');
    },
    onSuccess: () => {
      alert('댓글 수정이 완료되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../api/comment';

export function useDeleteCommentMutation(commentId, postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteComment(commentId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });

      const previousComments = queryClient.getQueryData({
        queryKey: ['comments', postId],
      });

      queryClient.setQueryData({ queryKey: ['comments', postId] }, old => {
        if (!old) return old;
        return {
          ...old,
          result: old.result.filter(comment => comment._id !== commentId),
        };
      });

      return { previousComments };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        { queryKey: ['comments', postId] },
        context.previousComments,
      );
      alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('댓글이 삭제되었습니다.');
    },
  });
}

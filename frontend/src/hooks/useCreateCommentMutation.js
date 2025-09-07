import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '../api/comment';

export function useCreateCommentMutation(postId, commentRef) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentData => createComment(postId, commentData),
    onMutate: async commentData => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });

      const previousComments = queryClient.getQueryData(['comments', postId]);

      queryClient.setQueryData(['comments', postId], old => {
        if (!old) return old;
        return {
          ...old,
          result: [commentData, ...old.result],
        };
      });

      return { previousComments };
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(['comments', postId], context.previousComments);
      alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
    },
    onSuccess: () => {
      alert('댓글이 등록되었습니다.');
      if (commentRef?.current) {
        commentRef.current.value = '';
      }
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

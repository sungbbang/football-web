import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../api/post';

export function useDeletePostMutation(postId, search) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deletePost(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const previousPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], old => {
        if (!old) return old;
        return {
          ...old,
          result: old.result.filter(post => post.id !== postId),
        };
      });

      return { previousPosts };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['posts'], context.previousPosts);
      alert('게시글 삭제에 실패했습니다. 다시 시도해주세요.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      alert('게시글이 삭제되었습니다.');
      const redirectPath = search ? '/my/post' : '/board';
      navigate(redirectPath, { replace: true });
    },
  });
}

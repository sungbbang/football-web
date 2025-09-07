import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/post';

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postData => createPost(postData),
    onMutate: async postData => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const previousPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], old => {
        if (!old) return old;
        return {
          ...old,
          result: [postData, ...old.result],
        };
      });

      return { previousPosts };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['posts'], context.previousPosts);
      alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('게시글 등록 성공!');
      navigate(`/board/${data.result._id}`, { replace: true });
    },
  });
}

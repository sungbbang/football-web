import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editPost } from '../api/post';
import { useNavigate } from 'react-router-dom';

export function useEditPostMutation(postId) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const keys = ['post', postId];
  return useMutation({
    mutationFn: postData => editPost(postId, postData),
    onMutate: async newPostData => {
      await queryClient.cancelQueries({ queryKey: keys });

      const previousPost = queryClient.getQueryData({ queryKey: keys });

      queryClient.setQueryData({ queryKey: keys }, old => {
        if (!old) return old;
        return {
          ...old,
          result: {
            ...old.result,
            ...newPostData,
          },
        };
      });

      return { previousPost };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        {
          queryKey: keys,
        },
        context.previousPost,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keys,
      });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('수정이 완료되었습니다!');
      navigate(-1, { replace: true });
    },
  });
}

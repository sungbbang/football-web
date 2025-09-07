import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateView } from '../api/post';

export function useUpdateViewMutation(postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateView(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] });

      const previousPost = queryClient.getQueryData(['post', postId]);

      queryClient.setQueryData(['post', postId], old => {
        if (!old?.result) return old;
        return {
          ...old,
          result: {
            ...old.result,
            views: old.result.views + 1,
          },
        };
      });

      return { previousPost };
    },
    onError: (err, _, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost);
      }
    },
    onSuccess: data => {
      queryClient.setQueryData(['post', postId], old => {
        if (!old) return data;
        return {
          ...old,
          result: {
            ...old.result,
            views: data.result.views,
          },
        };
      });

      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost } from '../api/post';

export function useLikePostMutation(postId, userId) {
  const queryClient = useQueryClient();
  const keys = ['post', postId];
  return useMutation({
    mutationFn: () => likePost(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: keys });

      const previousPost = queryClient.getQueryData({
        queryKey: keys,
      });

      queryClient.setQueryData(
        {
          queryKey: keys,
        },
        old => {
          if (!old) return old;
          const alreadyLiked = old.result.likedUsers.includes(userId);
          return {
            ...old,
            result: {
              ...old.result,
              likedUsers: alreadyLiked
                ? old.result.likedUsers.filter(id => id !== userId)
                : [...old.result.likedUsers, userId],
              likesCount: alreadyLiked
                ? old.result.likesCount - 1
                : old.result.likesCount + 1,
            },
          };
        },
      );

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
    },
  });
}

import { mutationOptions } from '@tanstack/react-query';
import { likePost } from '../api/post';

export const likePostMutation = (queryClient, postId, userId) =>
  mutationOptions({
    mutationFn: () => likePost(postId),
    onMutate: async () => {
      await queryClient.cancelQueries(['post', postId]);

      const previousPost = queryClient.getQueryData({
        queryKey: ['post', postId],
      });

      queryClient.setQueryData(
        {
          queryKey: ['post', postId],
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
          queryKey: ['post', postId],
        },
        context.previousPost,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', postId],
      });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePostMutation } from '../mutation';

export function useLikeMutation(postId, userId) {
  const queryClient = useQueryClient();
  return useMutation(likePostMutation(queryClient, postId, userId));
}

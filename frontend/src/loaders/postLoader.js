import { postsQuery } from '../query';

export const postsLoader = queryClient => async () => {
  await queryClient.ensureQueryData(postsQuery());
};

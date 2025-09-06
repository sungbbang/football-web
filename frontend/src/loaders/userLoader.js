import { userCommentsQuery, userPostsQuery } from '../query';

export const userPostsLoader = queryClient => async () => {
  await queryClient.ensureQueryData(userPostsQuery());
};

export const userCommentsLoader = queryClient => async () => {
  await queryClient.ensureQueryData(userCommentsQuery());
};

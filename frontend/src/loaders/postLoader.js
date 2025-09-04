import { postQuery, postsQuery } from '../query';

export const postsLoader = queryClient => async () => {
  await queryClient.ensureQueryData(postsQuery());
};

export const postLoader =
  queryClient =>
  async ({ params }) => {
    const postId = params.id;

    await queryClient.ensureQueryData(postQuery(postId));

    return { postId };
  };

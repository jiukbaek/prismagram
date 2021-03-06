import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [{ user: { id: user.id } }, { post: { id } }]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({
          where: {
            post: {
              id: parent.id
            }
          }
        })
        .aggregate()
        .count(),
    files: parent => prisma.post({ id: parent.id }).files(),
    comments: parent => prisma.post({ id: parent.id }).comments(),
    commentsCount: ({ id }) =>
      prisma
        .commentsConnection({ where: { post: { id } } })
        .aggregate()
        .count(),
    user: parent => prisma.post({ id: parent.id }).user()
  }
};

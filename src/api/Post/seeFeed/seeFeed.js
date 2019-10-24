import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.posts({
        where: {
          OR: [
            { user: { followers_some: { id: user.id } } },
            { user: { id: user.id } }
          ]
        },
        orderBy: "createdAt_DESC"
      });
    }
  }
};

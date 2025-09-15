import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return result;
};

const getAllPosts = async ({
  page,
  limit,
  search,
  isFeatured,
  tags,
  sortBy,
  sortOrder,
}: {
  page: number;
  limit: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
  sortBy?: string;
  sortOrder?: string;
}) => {
  const skip = (page - 1) * limit;

  const where: any = {
    AND: [
      search && {
        //search (title or content) functionality
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      //filter using isFeatured
      typeof isFeatured === "boolean" && { isFeatured },
      tags && tags.length >= 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };

  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const totalData = await prisma.post.count({ where });
  const totalPages = Math.ceil(totalData / limit);

  return {
    data: result,
    pagination: {
      page,
      limit,
      totalData,
      totalPages,
    },
  };
};

const getPostById = async (id: number) => {
  const result = await prisma.$transaction(async (tx) => {
    // increment view count
    await tx.post.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const postData = await tx.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return postData;
  });

  return result;
};

const updatePost = async (id: number, data: Partial<any>) => {
  return prisma.post.update({ where: { id }, data });
};

const getBlogStats = async () => {
  const blogStat = await prisma.$transaction(async (tx) => {
    const aggregates = await tx.post.aggregate({
      _count: true,
      _sum: { views: true },
      _avg: { views: true },
      _max: { views: true },
      _min: { views: true },
    });

    const featuredCount = await tx.post.count({
      where: {
        isFeatured: true,
      },
    });

    const topFeatured = await tx.post.findFirst({
      where: { isFeatured: true },
      orderBy: { views: "desc" },
    });

    return {
      stats: {
        totalPosts: aggregates._count ?? 0,
        totalViews: aggregates._sum.views ?? 0,
        avgViews: aggregates._avg.views ?? 0,
        maxViews: aggregates._max.views ?? 0,
        minViews: aggregates._min.views ?? 0,
      },
      featured: {
        count: featuredCount,
        topPost: topFeatured,
      },
    };
  });

  return blogStat;
};

const deletePost = async (id: number) => {
  return prisma.post.delete({ where: { id } });
};

export const PostService = {
  createPost,
  getBlogStats,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

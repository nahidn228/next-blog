import { post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import { title } from "process";

const createPost = async (payload: Prisma.postCreateInput): Promise<post> => {
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
  const result = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });

  return result;
};

const updatePost = async (id: number, data: Partial<any>) => {
  return prisma.post.update({ where: { id }, data });
};

const deletePost = async (id: number) => {
  return prisma.post.delete({ where: { id } });
};

export const PostService = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

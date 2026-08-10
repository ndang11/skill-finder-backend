import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreatePostDto } from './dto/create-post.dto.js';
import type { UpdatePostDto } from './dto/update-post.dto.js';
import type { AddCommentDto } from './dto/add-comment.dto.js';

const authorSelect = {
  select: { id: true, fullName: true, avatarUrl: true },
};

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(authorId: string, createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId,
        likes: [],
        tags: createPostDto.tags ?? [],
        postType: createPostDto.postType ?? 'showcase',
      },
      include: { author: authorSelect },
    });
  }

  async findAll(category?: string) {
    return this.prisma.post.findMany({
      where: category
        ? { authorCategory: { equals: category, mode: 'insensitive' } }
        : undefined,
      include: {
        author: authorSelect,
        comments: {
          include: { author: authorSelect },
          orderBy: { createdAt: 'asc' },
        },
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            location: true,
            whatsappNumber: true,
            bio: true,
            createdAt: true,
            skills: {
              select: {
                id: true,
                title: true,
                category: true,
                price: true,
              },
            },
            reviewsReceived: {
              select: {
                rating: true,
              },
            },
          },
        },
        comments: {
          include: {
            author: authorSelect,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    const reviews = post.author?.reviewsReceived || [];
    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? Math.round(
            (reviews.reduce((acc, curr) => acc + curr.rating, 0) /
              totalReviews) *
              10,
          ) / 10
        : 0;

    return {
      ...post,
      author: {
        id: post.author?.id,
        fullName: post.author?.fullName || 'Professional',
        avatarUrl: post.author?.avatarUrl,
        location: post.author?.location || 'Cameroon',
        whatsappNumber: post.author?.whatsappNumber,
        bio: post.author?.bio,
        createdAt: post.author?.createdAt,
        skills: post.author?.skills || [],
        averageRating,
        totalReviews,
      },
    };
  }

  async findByAuthor(authorId: string) {
    return this.prisma.post.findMany({
      where: { authorId },
      include: {
        author: authorSelect,
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(postId: string, authorId: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException(`Post not found`);
    if (post.authorId !== authorId)
      throw new ForbiddenException(`Cannot edit another user's post`);

    return this.prisma.post.update({
      where: { id: postId },
      data: updatePostDto,
    });
  }

  async toggleLike(postId: string, userId: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException(`Post not found`);

    const likes = post.likes as string[];
    const alreadyLiked = likes.includes(userId);

    return this.prisma.post.update({
      where: { id: postId },
      data: {
        likes: alreadyLiked
          ? likes.filter((id) => id !== userId)
          : [...likes, userId],
      },
    });
  }

  async addComment(postId: string, addCommentDto: AddCommentDto) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException(`Post not found`);

    return this.prisma.comment.create({
      data: {
        postId,
        authorId: addCommentDto.authorId,
        content: addCommentDto.content,
      },
      include: { author: authorSelect },
    });
  }

  async remove(postId: string, authorId: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException(`Post not found`);
    if (post.authorId !== authorId)
      throw new ForbiddenException(`Cannot delete another user's post`);

    await this.prisma.post.delete({ where: { id: postId } });
  }
}

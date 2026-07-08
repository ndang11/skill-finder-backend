import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity.js';
import { Comment } from './entities/comment.entity.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { AddCommentDto } from './dto/add-comment.dto.js';

@Injectable()
export class PostsService {
  private posts: Post[] = []; // In-memory store

  async create(authorId: string, createPostDto: CreatePostDto): Promise<Post> {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId,
      ...createPostDto,
      likes: [],
      comments: [],
      createdAt: new Date(),
    };
    this.posts.unshift(newPost);
    return newPost;
  }

  async findAll(category?: string): Promise<Post[]> {
    const sorted = [...this.posts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    if (category) {
      return sorted.filter(
        (p) => p.authorCategory.toLowerCase() === category.toLowerCase(),
      );
    }
    return sorted;
  }

  async findByAuthor(authorId: string): Promise<Post[]> {
    return this.posts
      .filter((p) => p.authorId === authorId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async update(postId: string, authorId: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = this.findPostOrFail(postId);
    if (post.authorId !== authorId) {
      throw new NotFoundException('Post not found or access denied');
    }
    Object.assign(post, updatePostDto);
    return post;
  }

  async toggleLike(postId: string, userId: string): Promise<Post> {
    const post = this.findPostOrFail(postId);
    const likedIndex = post.likes.indexOf(userId);
    if (likedIndex > -1) {
      post.likes.splice(likedIndex, 1);
    } else {
      post.likes.push(userId);
    }
    return post;
  }

  async addComment(postId: string, addCommentDto: AddCommentDto): Promise<Comment> {
    const post = this.findPostOrFail(postId);
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      ...addCommentDto,
      createdAt: new Date(),
    };
    post.comments.push(newComment);
    return newComment;
  }

  async remove(postId: string, authorId: string): Promise<void> {
    const index = this.posts.findIndex(
      (p) => p.id === postId && p.authorId === authorId,
    );
    if (index === -1) {
      throw new NotFoundException('Post not found or access denied');
    }
    this.posts.splice(index, 1);
  }

  private findPostOrFail(postId: string): Post {
    const post = this.posts.find((p) => p.id === postId);
    if (!post) throw new NotFoundException(`Post with ID ${postId} not found`);
    return post;
  }
}

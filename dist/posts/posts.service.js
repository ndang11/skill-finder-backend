var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity.js';
import { Comment } from './entities/comment.entity.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { AddCommentDto } from './dto/add-comment.dto.js';
let PostsService = class PostsService {
    posts = [];
    async create(authorId, createPostDto) {
        const newPost = {
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
    async findAll(category) {
        const sorted = [...this.posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        if (category) {
            return sorted.filter((p) => p.authorCategory.toLowerCase() === category.toLowerCase());
        }
        return sorted;
    }
    async findByAuthor(authorId) {
        return this.posts
            .filter((p) => p.authorId === authorId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    async update(postId, authorId, updatePostDto) {
        const post = this.findPostOrFail(postId);
        if (post.authorId !== authorId) {
            throw new NotFoundException('Post not found or access denied');
        }
        Object.assign(post, updatePostDto);
        return post;
    }
    async toggleLike(postId, userId) {
        const post = this.findPostOrFail(postId);
        const likedIndex = post.likes.indexOf(userId);
        if (likedIndex > -1) {
            post.likes.splice(likedIndex, 1);
        }
        else {
            post.likes.push(userId);
        }
        return post;
    }
    async addComment(postId, addCommentDto) {
        const post = this.findPostOrFail(postId);
        const newComment = {
            id: `comment-${Date.now()}`,
            postId,
            ...addCommentDto,
            createdAt: new Date(),
        };
        post.comments.push(newComment);
        return newComment;
    }
    async remove(postId, authorId) {
        const index = this.posts.findIndex((p) => p.id === postId && p.authorId === authorId);
        if (index === -1) {
            throw new NotFoundException('Post not found or access denied');
        }
        this.posts.splice(index, 1);
    }
    findPostOrFail(postId) {
        const post = this.posts.find((p) => p.id === postId);
        if (!post)
            throw new NotFoundException(`Post with ID ${postId} not found`);
        return post;
    }
};
PostsService = __decorate([
    Injectable()
], PostsService);
export { PostsService };
//# sourceMappingURL=posts.service.js.map
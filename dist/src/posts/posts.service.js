var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(authorId, createPostDto) {
        return this.prisma.post.create({
            data: {
                ...createPostDto,
                authorId,
                likes: [],
            },
            include: { author: { select: { id: true, fullname: true, avatarUrl: true } } },
        });
    }
    async findAll(category) {
        return this.prisma.post.findMany({
            where: category
                ? { authorCategory: { equals: category, mode: 'insensitive' } }
                : undefined,
            include: {
                author: { select: { id: true, fullname: true, avatarUrl: true } },
                comments: {
                    include: {
                        author: { select: { id: true, fullname: true, avatarUrl: true } },
                    },
                    orderBy: { createdAt: 'asc' },
                },
                _count: { select: { comments: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByAuthor(authorId) {
        return this.prisma.post.findMany({
            where: { authorId },
            include: {
                author: { select: { id: true, fullname: true, avatarUrl: true } },
                _count: { select: { comments: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async update(postId, authorId, updatePostDto) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post)
            throw new NotFoundException(`Post not found`);
        if (post.authorId !== authorId)
            throw new ForbiddenException(`Cannot edit another user's post`);
        return this.prisma.post.update({
            where: { id: postId },
            data: updatePostDto,
        });
    }
    async toggleLike(postId, userId) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post)
            throw new NotFoundException(`Post not found`);
        const likes = post.likes;
        const alreadyLiked = likes.includes(userId);
        return this.prisma.post.update({
            where: { id: postId },
            data: {
                likes: alreadyLiked ? likes.filter((id) => id !== userId) : [...likes, userId],
            },
        });
    }
    async addComment(postId, addCommentDto) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post)
            throw new NotFoundException(`Post not found`);
        return this.prisma.comment.create({
            data: {
                postId,
                authorId: addCommentDto.authorId,
                content: addCommentDto.content,
            },
            include: {
                author: { select: { id: true, fullname: true, avatarUrl: true } },
            },
        });
    }
    async remove(postId, authorId) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post)
            throw new NotFoundException(`Post not found`);
        if (post.authorId !== authorId)
            throw new ForbiddenException(`Cannot delete another user's post`);
        await this.prisma.post.delete({ where: { id: postId } });
    }
};
PostsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PostsService);
export { PostsService };
//# sourceMappingURL=posts.service.js.map
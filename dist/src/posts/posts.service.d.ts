import { PrismaService } from '../prisma/prisma.service.js';
import type { CreatePostDto } from './dto/create-post.dto.js';
import type { UpdatePostDto } from './dto/update-post.dto.js';
import type { AddCommentDto } from './dto/add-comment.dto.js';
export declare class PostsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(authorId: string, createPostDto: CreatePostDto): Promise<{
        author: {
            id: string;
            fullname: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        authorCategory: string;
        authorId: string;
        likes: string[];
    }>;
    findAll(category?: string): Promise<({
        comments: ({
            author: {
                id: string;
                fullname: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            content: string;
            authorId: string;
            postId: string;
        })[];
        _count: {
            comments: number;
        };
        author: {
            id: string;
            fullname: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        authorCategory: string;
        authorId: string;
        likes: string[];
    })[]>;
    findByAuthor(authorId: string): Promise<({
        _count: {
            comments: number;
        };
        author: {
            id: string;
            fullname: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        authorCategory: string;
        authorId: string;
        likes: string[];
    })[]>;
    update(postId: string, authorId: string, updatePostDto: UpdatePostDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        authorCategory: string;
        authorId: string;
        likes: string[];
    }>;
    toggleLike(postId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        authorCategory: string;
        authorId: string;
        likes: string[];
    }>;
    addComment(postId: string, addCommentDto: AddCommentDto): Promise<{
        author: {
            id: string;
            fullname: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
    remove(postId: string, authorId: string): Promise<void>;
}

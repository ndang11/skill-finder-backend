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
            fullName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        authorId: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
    }>;
    findAll(category?: string): Promise<({
        comments: ({
            author: {
                id: string;
                fullName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            authorId: string;
            content: string;
            postId: string;
        })[];
        author: {
            id: string;
            fullName: string;
            avatarUrl: string | null;
        };
        _count: {
            comments: number;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        authorId: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
    })[]>;
    findByAuthor(authorId: string): Promise<({
        author: {
            id: string;
            fullName: string;
            avatarUrl: string | null;
        };
        _count: {
            comments: number;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        authorId: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
    })[]>;
    update(postId: string, authorId: string, updatePostDto: UpdatePostDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        authorId: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
    }>;
    toggleLike(postId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        authorId: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
    }>;
    addComment(postId: string, addCommentDto: AddCommentDto): Promise<{
        author: {
            id: string;
            fullName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        authorId: string;
        content: string;
        postId: string;
    }>;
    remove(postId: string, authorId: string): Promise<void>;
}

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
        title: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
        createdAt: Date;
        authorId: string;
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
            content: string;
            createdAt: Date;
            authorId: string;
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
        title: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
        createdAt: Date;
        authorId: string;
    })[]>;
    findOne(id: string): Promise<{
        author: {
            id: string;
            fullName: string;
            avatarUrl: string | null;
            location: string;
            whatsappNumber: string | null;
            bio: string | null;
            createdAt: Date;
            skills: {
                id: string;
                title: string;
                category: string;
                price: number | null;
            }[];
            averageRating: number;
            totalReviews: number;
        };
        comments: ({
            author: {
                id: string;
                fullName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            content: string;
            createdAt: Date;
            authorId: string;
            postId: string;
        })[];
        id: string;
        title: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
        createdAt: Date;
        authorId: string;
    }>;
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
        title: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
        createdAt: Date;
        authorId: string;
    })[]>;
    update(postId: string, authorId: string, updatePostDto: UpdatePostDto): Promise<{
        id: string;
        title: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
        createdAt: Date;
        authorId: string;
    }>;
    toggleLike(postId: string, userId: string): Promise<{
        id: string;
        title: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
        createdAt: Date;
        authorId: string;
    }>;
    addComment(postId: string, addCommentDto: AddCommentDto): Promise<{
        author: {
            id: string;
            fullName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        content: string;
        createdAt: Date;
        authorId: string;
        postId: string;
    }>;
    remove(postId: string, authorId: string): Promise<void>;
}

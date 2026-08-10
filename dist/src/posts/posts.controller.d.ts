import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { AddCommentDto } from './dto/add-comment.dto.js';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
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
    getMyPosts(userId: string): Promise<({
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
            createdAt: Date;
            authorId: string;
            content: string;
            postId: string;
        })[];
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
    create(userId: string, createPostDto: CreatePostDto): Promise<{
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
    update(postId: string, userId: string, updatePostDto: UpdatePostDto): Promise<{
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
    remove(postId: string, userId: string): Promise<void>;
}

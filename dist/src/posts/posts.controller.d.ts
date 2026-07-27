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
            authorId: string;
            content: string;
            createdAt: Date;
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
        authorId: string;
        title: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
        createdAt: Date;
    })[]>;
    create(userId: string, createPostDto: CreatePostDto): Promise<{
        author: {
            id: string;
            fullName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        authorId: string;
        title: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
        createdAt: Date;
    }>;
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
        authorId: string;
        title: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
        createdAt: Date;
    })[]>;
    update(postId: string, userId: string, updatePostDto: UpdatePostDto): Promise<{
        id: string;
        authorId: string;
        title: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
        createdAt: Date;
    }>;
    toggleLike(postId: string, userId: string): Promise<{
        id: string;
        authorId: string;
        title: string;
        content: string;
        authorCategory: string;
        postType: string;
        tags: string[];
        imageUrl: string | null;
        likes: string[];
        createdAt: Date;
    }>;
    addComment(postId: string, addCommentDto: AddCommentDto): Promise<{
        author: {
            id: string;
            fullName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        authorId: string;
        content: string;
        createdAt: Date;
        postId: string;
    }>;
    remove(postId: string, userId: string): Promise<void>;
}

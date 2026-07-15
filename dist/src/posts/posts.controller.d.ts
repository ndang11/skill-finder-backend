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
    create(userId: string, createPostDto: CreatePostDto): Promise<{
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
    getMyPosts(userId: string): Promise<({
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
    update(postId: string, userId: string, updatePostDto: UpdatePostDto): Promise<{
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
    remove(postId: string, userId: string): Promise<void>;
}

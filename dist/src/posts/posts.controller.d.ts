import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { AddCommentDto } from './dto/add-comment.dto.js';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(category?: string): Promise<import("./entities/post.entity.js").Post[]>;
    create(userId: string, createPostDto: CreatePostDto): Promise<import("./entities/post.entity.js").Post>;
    getMyPosts(userId: string): Promise<import("./entities/post.entity.js").Post[]>;
    update(postId: string, userId: string, updatePostDto: UpdatePostDto): Promise<import("./entities/post.entity.js").Post>;
    toggleLike(postId: string, userId: string): Promise<import("./entities/post.entity.js").Post>;
    addComment(postId: string, addCommentDto: AddCommentDto): Promise<import("./entities/comment.entity.js").Comment>;
    remove(postId: string, userId: string): Promise<void>;
}

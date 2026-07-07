import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AddCommentDto } from './dto/add-comment.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(category?: string): Promise<import("./entities/post.entity").Post[]>;
    create(userId: string, createPostDto: CreatePostDto): Promise<import("./entities/post.entity").Post>;
    getMyPosts(userId: string): Promise<import("./entities/post.entity").Post[]>;
    update(postId: string, userId: string, updatePostDto: UpdatePostDto): Promise<import("./entities/post.entity").Post>;
    toggleLike(postId: string, userId: string): Promise<import("./entities/post.entity").Post>;
    addComment(postId: string, addCommentDto: AddCommentDto): Promise<import("./entities/comment.entity").Comment>;
    remove(postId: string, userId: string): Promise<void>;
}

import { Post } from './entities/post.entity.js';
import { Comment } from './entities/comment.entity.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { AddCommentDto } from './dto/add-comment.dto.js';
export declare class PostsService {
    private posts;
    create(authorId: string, createPostDto: CreatePostDto): Promise<Post>;
    findAll(category?: string): Promise<Post[]>;
    findByAuthor(authorId: string): Promise<Post[]>;
    update(postId: string, authorId: string, updatePostDto: UpdatePostDto): Promise<Post>;
    toggleLike(postId: string, userId: string): Promise<Post>;
    addComment(postId: string, addCommentDto: AddCommentDto): Promise<Comment>;
    remove(postId: string, authorId: string): Promise<void>;
    private findPostOrFail;
}

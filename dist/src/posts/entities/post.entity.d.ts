import { Comment } from './comment.entity.js';
export declare class Post {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    authorCategory: string;
    authorLocation: string;
    authorPhone: string;
    content: string;
    imageUrl?: string;
    likes: string[];
    comments: Comment[];
    createdAt: Date;
}

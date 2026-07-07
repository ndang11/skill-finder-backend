import { Comment } from './comment.entity';

export class Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorCategory: string;
  authorLocation: string;
  authorPhone: string;
  content: string;
  imageUrl?: string;
  likes: string[]; // List of user IDs who liked the post
  comments: Comment[];
  createdAt: Date;
}

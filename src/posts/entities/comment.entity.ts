export class Comment {
  id: string;
  postId: string;
  authorName: string;
  authorRole: 'customer' | 'professional' | 'admin';
  content: string;
  createdAt: Date;
}

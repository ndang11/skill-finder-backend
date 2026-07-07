export class AddCommentDto {
  authorName: string;
  authorRole: 'customer' | 'professional' | 'admin';
  content: string;
}

import { IsString, IsUUID } from 'class-validator';

export class AddCommentDto {
  @IsUUID()
  authorId: string;

  @IsString()
  content: string;
}

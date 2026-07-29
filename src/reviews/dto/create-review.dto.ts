import { IsString, IsOptional, IsNumber, IsUUID, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  professionalId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsUUID()
  @IsOptional()
  skillId?: string;

  @IsUUID()
  @IsOptional()
  bookingId?: string;
}

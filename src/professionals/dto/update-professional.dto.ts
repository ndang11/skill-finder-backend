import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateProfessionalDto {
  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  whatsappNumber?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];
}

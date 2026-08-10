import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  fullname: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsEnum(['customer', 'professional', 'admin'])
  @IsOptional()
  role?: 'customer' | 'professional' | 'admin';

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

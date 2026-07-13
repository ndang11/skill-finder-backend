import { IsString, IsEmail, IsOptional, IsEnum, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  fullname: string;

  @IsString()
  username: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsEnum(['customer', 'professional', 'admin'])
  role: 'customer' | 'professional' | 'admin';

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

import { Controller, Get, Post, Body, Patch, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard.js';
import { GetUser } from '../common/decorators/get-user.decorator.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Triggered by frontend or webhook after Supabase sign-up
  @Post('sync')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(SupabaseAuthGuard)
  @Get('me')
  getProfile(@GetUser('id') userId: string) {
    return this.usersService.findOne(userId);
  }

  @UseGuards(SupabaseAuthGuard)
  @Patch('me')
  updateProfile(
    @GetUser('id') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.update(userId, updateProfileDto);
  }

  @UseGuards(SupabaseAuthGuard)
  @Put('profile/avatar')
  @UseInterceptors(FileInterceptor('avatar')) // Listens for file payload key 'avatar'
  async uploadAvatar(
    @GetUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.updateAvatar(userId, file);
  }
}

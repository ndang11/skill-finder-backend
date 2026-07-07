import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

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
  updateProfile(@GetUser('id') userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.update(userId, updateProfileDto);
  }
}

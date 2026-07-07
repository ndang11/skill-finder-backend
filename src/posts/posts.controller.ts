import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Anyone can view the feed
  @Get()
  findAll(@Query('category') category?: string) {
    return this.postsService.findAll(category);
  }

  // Only verified professionals can post
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles('professional', 'admin')
  @Post()
  create(@GetUser('id') userId: string, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(userId, createPostDto);
  }

  // Get all posts by the authenticated professional
  @UseGuards(SupabaseAuthGuard)
  @Get('my-posts')
  getMyPosts(@GetUser('id') userId: string) {
    return this.postsService.findByAuthor(userId);
  }

  // Update own post
  @UseGuards(SupabaseAuthGuard)
  @Patch(':id')
  update(
    @Param('id') postId: string,
    @GetUser('id') userId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(postId, userId, updatePostDto);
  }

  // Like / unlike a post (any authenticated user)
  @UseGuards(SupabaseAuthGuard)
  @Post(':id/like')
  toggleLike(@Param('id') postId: string, @GetUser('id') userId: string) {
    return this.postsService.toggleLike(postId, userId);
  }

  // Add a comment to a post (any authenticated user)
  @UseGuards(SupabaseAuthGuard)
  @Post(':id/comments')
  addComment(@Param('id') postId: string, @Body() addCommentDto: AddCommentDto) {
    return this.postsService.addComment(postId, addCommentDto);
  }

  // Delete own post
  @UseGuards(SupabaseAuthGuard)
  @Delete(':id')
  remove(@Param('id') postId: string, @GetUser('id') userId: string) {
    return this.postsService.remove(postId, userId);
  }
}

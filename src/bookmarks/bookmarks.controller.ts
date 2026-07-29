import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service.js';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard.js';
import { GetUser } from '../common/decorators/get-user.decorator.js';

@Controller('bookmarks')
@UseGuards(SupabaseAuthGuard)
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Get()
  getBookmarks(@GetUser('id') userId: string) {
    return this.bookmarksService.getBookmarks(userId);
  }

  @Get('check/:skillId')
  checkIsBookmarked(
    @GetUser('id') userId: string,
    @Param('skillId') skillId: string,
  ) {
    return this.bookmarksService.checkIsBookmarked(userId, skillId);
  }

  @Post(':skillId')
  addBookmark(
    @GetUser('id') userId: string,
    @Param('skillId') skillId: string,
  ) {
    return this.bookmarksService.addBookmark(userId, skillId);
  }

  @Delete(':skillId')
  removeBookmark(
    @GetUser('id') userId: string,
    @Param('skillId') skillId: string,
  ) {
    return this.bookmarksService.removeBookmark(userId, skillId);
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { ProfessionalsModule } from './professionals/professionals.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { PostsModule } from './posts/posts.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CloudinaryModule } from './cloudinary/cloudinary.module.js';
import { BookmarksModule } from './bookmarks/bookmarks.module.js';
import { I18nModule } from './common/i18n/i18n.module.js';

@Module({
  imports: [
    // Load .env variables globally across all modules
    ConfigModule.forRoot({ isGlobal: true }),
    I18nModule,
    AuthModule,
    UsersModule,
    ProfessionalsModule,
    CategoriesModule,
    PostsModule,
    ReviewsModule,
    PrismaModule,
    CloudinaryModule,
    BookmarksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

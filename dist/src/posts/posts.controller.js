var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { AddCommentDto } from './dto/add-comment.dto.js';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard.js';
import { GetUser } from '../common/decorators/get-user.decorator.js';
let PostsController = class PostsController {
    postsService;
    constructor(postsService) {
        this.postsService = postsService;
    }
    findAll(category) {
        return this.postsService.findAll(category);
    }
    create(userId, createPostDto) {
        return this.postsService.create(userId, createPostDto);
    }
    getMyPosts(userId) {
        return this.postsService.findByAuthor(userId);
    }
    update(postId, userId, updatePostDto) {
        return this.postsService.update(postId, userId, updatePostDto);
    }
    toggleLike(postId, userId) {
        return this.postsService.toggleLike(postId, userId);
    }
    addComment(postId, addCommentDto) {
        return this.postsService.addComment(postId, addCommentDto);
    }
    remove(postId, userId) {
        return this.postsService.remove(postId, userId);
    }
};
__decorate([
    Get(),
    __param(0, Query('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAll", null);
__decorate([
    UseGuards(SupabaseAuthGuard),
    Post(),
    __param(0, GetUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "create", null);
__decorate([
    UseGuards(SupabaseAuthGuard),
    Get('my-posts'),
    __param(0, GetUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getMyPosts", null);
__decorate([
    UseGuards(SupabaseAuthGuard),
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, UpdatePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "update", null);
__decorate([
    UseGuards(SupabaseAuthGuard),
    Post(':id/like'),
    __param(0, Param('id')),
    __param(1, GetUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "toggleLike", null);
__decorate([
    UseGuards(SupabaseAuthGuard),
    Post(':id/comments'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AddCommentDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "addComment", null);
__decorate([
    UseGuards(SupabaseAuthGuard),
    Delete(':id'),
    __param(0, Param('id')),
    __param(1, GetUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "remove", null);
PostsController = __decorate([
    Controller('posts'),
    __metadata("design:paramtypes", [PostsService])
], PostsController);
export { PostsController };
//# sourceMappingURL=posts.controller.js.map
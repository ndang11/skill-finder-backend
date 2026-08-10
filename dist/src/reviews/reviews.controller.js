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
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service.js';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard.js';
import { GetUser } from '../common/decorators/get-user.decorator.js';
let ReviewsController = class ReviewsController {
    reviewsService;
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    create(customerId, createReviewDto) {
        return this.reviewsService.create(customerId, createReviewDto);
    }
    findMyReviews(customerId) {
        return this.reviewsService.findByAuthor(customerId);
    }
    findByProfessional(professionalId) {
        return this.reviewsService.findByProfessional(professionalId);
    }
    getAverageRating(professionalId) {
        return this.reviewsService.getAverageRating(professionalId);
    }
};
__decorate([
    UseGuards(SupabaseAuthGuard),
    Post(),
    __param(0, GetUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "create", null);
__decorate([
    UseGuards(SupabaseAuthGuard),
    Get('my-reviews'),
    __param(0, GetUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findMyReviews", null);
__decorate([
    Get('professional/:id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findByProfessional", null);
__decorate([
    Get('professional/:id/rating'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "getAverageRating", null);
ReviewsController = __decorate([
    Controller('reviews'),
    __metadata("design:paramtypes", [ReviewsService])
], ReviewsController);
export { ReviewsController };
//# sourceMappingURL=reviews.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
let ReviewsService = class ReviewsService {
    reviews = [];
    async create(customerId, createReviewDto) {
        const newReview = {
            id: `review-${Date.now()}`,
            customerId,
            ...createReviewDto,
            createdAt: new Date(),
        };
        this.reviews.push(newReview);
        return newReview;
    }
    async findByProfessional(professionalId) {
        return this.reviews
            .filter((r) => r.professionalId === professionalId)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    async getAverageRating(professionalId) {
        const reviews = await this.findByProfessional(professionalId);
        if (reviews.length === 0)
            return 0;
        const total = reviews.reduce((sum, r) => sum + r.rating, 0);
        return Math.round((total / reviews.length) * 10) / 10;
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)()
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map
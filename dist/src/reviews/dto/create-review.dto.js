var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsOptional, IsNumber, IsUUID, Min, Max } from 'class-validator';
export class CreateReviewDto {
    professionalId;
    rating;
    comment;
    skillId;
    bookingId;
}
__decorate([
    IsUUID(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "professionalId", void 0);
__decorate([
    IsNumber(),
    Min(1),
    Max(5),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "rating", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "comment", void 0);
__decorate([
    IsUUID(),
    IsOptional(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "skillId", void 0);
__decorate([
    IsUUID(),
    IsOptional(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "bookingId", void 0);
//# sourceMappingURL=create-review.dto.js.map
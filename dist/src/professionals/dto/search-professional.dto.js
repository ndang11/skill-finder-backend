var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
export class SearchProfessionalDto {
    category;
    location;
    minRating;
}
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], SearchProfessionalDto.prototype, "category", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], SearchProfessionalDto.prototype, "location", void 0);
__decorate([
    IsNumber(),
    IsOptional(),
    Min(0),
    Max(5),
    Type(() => Number),
    __metadata("design:type", Number)
], SearchProfessionalDto.prototype, "minRating", void 0);
//# sourceMappingURL=search-professional.dto.js.map
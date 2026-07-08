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
import { Controller, Get, Body, Patch, Query, UseGuards } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service.js';
import { SearchProfessionalDto } from './dto/search-professional.dto.js';
import { UpdateProfessionalDto } from './dto/update-professional.dto.js';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard.js';
import { GetUser } from '../common/decorators/get-user.decorator.js';
let ProfessionalsController = class ProfessionalsController {
    professionalsService;
    constructor(professionalsService) {
        this.professionalsService = professionalsService;
    }
    findAll(searchDto) {
        return this.professionalsService.findAll(searchDto);
    }
    update(userId, updateDto) {
        return this.professionalsService.update(userId, updateDto);
    }
};
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SearchProfessionalDto]),
    __metadata("design:returntype", void 0)
], ProfessionalsController.prototype, "findAll", null);
__decorate([
    UseGuards(SupabaseAuthGuard),
    Patch('profile'),
    __param(0, GetUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProfessionalDto]),
    __metadata("design:returntype", void 0)
], ProfessionalsController.prototype, "update", null);
ProfessionalsController = __decorate([
    Controller('professionals'),
    __metadata("design:paramtypes", [ProfessionalsService])
], ProfessionalsController);
export { ProfessionalsController };
//# sourceMappingURL=professionals.controller.js.map
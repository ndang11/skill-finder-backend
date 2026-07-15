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
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service.js';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard.js';
let CloudinaryController = class CloudinaryController {
    cloudinaryService;
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    getUploadSignature(folder = 'skill-finder-uploads') {
        return this.cloudinaryService.generateSignature(folder);
    }
};
__decorate([
    Get('signature'),
    __param(0, Query('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CloudinaryController.prototype, "getUploadSignature", null);
CloudinaryController = __decorate([
    Controller('cloudinary'),
    UseGuards(SupabaseAuthGuard),
    __metadata("design:paramtypes", [CloudinaryService])
], CloudinaryController);
export { CloudinaryController };
//# sourceMappingURL=cloudinary.controller.js.map
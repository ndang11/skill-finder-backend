var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';
let UsersService = class UsersService {
    prisma;
    cloudinaryService;
    constructor(prisma, cloudinaryService) {
        this.prisma = prisma;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createUserDto) {
        return this.prisma.user.upsert({
            where: { id: createUserDto.id },
            update: {
                email: createUserDto.email,
                fullname: createUserDto.fullname,
                username: createUserDto.username,
                phoneNumber: createUserDto.phoneNumber,
                avatarUrl: createUserDto.avatarUrl,
                role: createUserDto.role,
            },
            create: {
                id: createUserDto.id,
                email: createUserDto.email ?? '',
                fullname: createUserDto.fullname,
                username: createUserDto.username,
                phoneNumber: createUserDto.phoneNumber,
                avatarUrl: createUserDto.avatarUrl,
                role: createUserDto.role,
            },
        });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { professionalProfile: true },
        });
        if (!user)
            throw new NotFoundException(`User not found`);
        return user;
    }
    async update(id, updateProfileDto) {
        await this.findOne(id);
        return this.prisma.user.update({
            where: { id },
            data: updateProfileDto,
        });
    }
    async updateAvatar(userId, file) {
        const user = await this.findOne(userId);
        const uploadResult = await this.cloudinaryService.uploadImage(file, 'avatars');
        if (user.avatarUrl && user.avatarUrl.includes('cloudinary.com')) {
            try {
                const parts = user.avatarUrl.split('/');
                const uploadIndex = parts.indexOf('upload');
                if (uploadIndex !== -1 && parts.length > uploadIndex + 2) {
                    const publicIdWithExtension = parts.slice(uploadIndex + 2).join('/');
                    const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));
                    if (publicId) {
                        await this.cloudinaryService.deleteImage(publicId);
                    }
                }
            }
            catch (err) {
                console.warn(`Failed to delete old avatar in Cloudinary: ${err instanceof Error ? err.message : err}`);
            }
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: { avatarUrl: uploadResult.secure_url },
        });
    }
};
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        CloudinaryService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map
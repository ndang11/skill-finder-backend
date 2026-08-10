import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /**
   * Sync a user from Supabase Auth into the local database.
   * Called after sign-up (webhook or frontend call).
   */
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.upsert({
      where: { id: createUserDto.id },
      update: {
        email: createUserDto.email,
        fullName: createUserDto.fullname,
        avatarUrl: createUserDto.avatarUrl,
      },
      create: {
        id: createUserDto.id,
        email: createUserDto.email ?? '',
        fullName: createUserDto.fullname,
        avatarUrl: createUserDto.avatarUrl,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    await this.findOne(id); // ensures user exists
    return this.prisma.user.update({
      where: { id },
      data: updateProfileDto,
    });
  }

  async updateAvatar(userId: string, file: Express.Multer.File) {
    const user = await this.findOne(userId); // checks if exists
    
    // Upload the new image to Cloudinary (defaults to folder 'avatars')
    const uploadResult = await this.cloudinaryService.uploadImage(file, 'avatars');

    // Safe deletion of the old avatar on Cloudinary to prevent orphan files
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
      } catch (err) {
        console.warn(`Failed to delete old avatar in Cloudinary: ${err instanceof Error ? err.message : err}`);
      }
    }

    // Save the new secure CDN URL in the database
    return this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: uploadResult.secure_url },
    });
  }
}

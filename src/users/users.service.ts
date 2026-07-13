import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Sync a user from Supabase Auth into the local database.
   * Called after sign-up (webhook or frontend call).
   */
  async create(createUserDto: CreateUserDto) {
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

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { professionalProfile: true },
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
}

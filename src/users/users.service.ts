import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  private users: User[] = []; // In-memory mock database store

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = {
      ...createUserDto,
      isVerifiedProfessional: false,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateProfileDto);
    return user;
  }

  async verifyProfessional(id: string): Promise<User> {
    const user = await this.findOne(id);
    user.isVerifiedProfessional = true;
    return user;
  }
}

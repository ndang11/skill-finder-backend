var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { User } from './entities/user.entity.js';
let UsersService = class UsersService {
    users = [];
    async create(createUserDto) {
        const newUser = {
            ...createUserDto,
            isVerifiedProfessional: false,
            createdAt: new Date(),
        };
        this.users.push(newUser);
        return newUser;
    }
    async findOne(id) {
        const user = this.users.find((u) => u.id === id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async update(id, updateProfileDto) {
        const user = await this.findOne(id);
        Object.assign(user, updateProfileDto);
        return user;
    }
    async verifyProfessional(id) {
        const user = await this.findOne(id);
        user.isVerifiedProfessional = true;
        return user;
    }
};
UsersService = __decorate([
    Injectable()
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map
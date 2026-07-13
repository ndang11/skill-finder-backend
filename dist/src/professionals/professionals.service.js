var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { Professional } from './entities/professional.entity.js';
import { SearchProfessionalDto } from './dto/search-professional.dto.js';
import { UpdateProfessionalDto } from './dto/update-professional.dto.js';
let ProfessionalsService = class ProfessionalsService {
    professionals = [];
    async create(userId) {
        const newProfessional = {
            id: `prof-${Date.now()}`,
            userId,
            category: '',
            location: '',
            skills: [],
            averageRating: 0,
            completedJobs: 0,
        };
        this.professionals.push(newProfessional);
        return newProfessional;
    }
    async findAll(searchDto) {
        let result = [...this.professionals];
        if (searchDto.category) {
            result = result.filter((p) => p.category.toLowerCase().includes(searchDto.category.toLowerCase()));
        }
        if (searchDto.location) {
            result = result.filter((p) => p.location.toLowerCase().includes(searchDto.location.toLowerCase()));
        }
        if (searchDto.minRating) {
            result = result.filter((p) => p.averageRating >= Number(searchDto.minRating));
        }
        return result;
    }
    async findOne(id) {
        const prof = this.professionals.find((p) => p.id === id || p.userId === id);
        if (!prof) {
            throw new NotFoundException(`Professional profile not found`);
        }
        return prof;
    }
    async update(userId, updateDto) {
        let prof = this.professionals.find((p) => p.userId === userId);
        if (!prof) {
            prof = await this.create(userId);
        }
        Object.assign(prof, updateDto);
        return prof;
    }
};
ProfessionalsService = __decorate([
    Injectable()
], ProfessionalsService);
export { ProfessionalsService };
//# sourceMappingURL=professionals.service.js.map
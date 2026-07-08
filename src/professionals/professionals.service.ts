import { Injectable, NotFoundException } from '@nestjs/common';
import { Professional } from './entities/professional.entity.js';
import { SearchProfessionalDto } from './dto/search-professional.dto.js';
import { UpdateProfessionalDto } from './dto/update-professional.dto.js';

@Injectable()
export class ProfessionalsService {
  private professionals: Professional[] = []; // In-memory store

  async create(userId: string): Promise<Professional> {
    const newProfessional: Professional = {
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

  async findAll(searchDto: SearchProfessionalDto): Promise<Professional[]> {
    let result = [...this.professionals];

    if (searchDto.category) {
      result = result.filter((p) =>
        p.category.toLowerCase().includes(searchDto.category!.toLowerCase()),
      );
    }

    if (searchDto.location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(searchDto.location!.toLowerCase()),
      );
    }

    if (searchDto.minRating) {
      result = result.filter((p) => p.averageRating >= Number(searchDto.minRating));
    }

    return result;
  }

  async findOne(id: string): Promise<Professional> {
    const prof = this.professionals.find((p) => p.id === id || p.userId === id);
    if (!prof) {
      throw new NotFoundException(`Professional profile not found`);
    }
    return prof;
  }

  async update(userId: string, updateDto: UpdateProfessionalDto): Promise<Professional> {
    let prof = this.professionals.find((p) => p.userId === userId);
    if (!prof) {
      prof = await this.create(userId);
    }
    Object.assign(prof, updateDto);
    return prof;
  }
}

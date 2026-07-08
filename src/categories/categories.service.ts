import { Injectable, ConflictException } from '@nestjs/common';
import { Category } from './entities/category.entity.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    { id: 'cat-1', name: 'Solar Installer', slug: 'solar-installer' },
    { id: 'cat-2', name: 'Hairdresser', slug: 'hairdresser' },
    { id: 'cat-3', name: 'Mechanic', slug: 'mechanic' },
    { id: 'cat-4', name: 'Tailor/Fashion Designer', slug: 'tailor-fashion-designer' },
  ];

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existing = this.categories.find(
      (c) => c.slug === createCategoryDto.slug.toLowerCase(),
    );
    if (existing) {
      throw new ConflictException(`Category with slug ${createCategoryDto.slug} already exists`);
    }

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      ...createCategoryDto,
      slug: createCategoryDto.slug.toLowerCase(),
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }
}

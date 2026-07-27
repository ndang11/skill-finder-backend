import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateCategoryDto } from './dto/create-category.dto.js';

const STATIC_CATEGORIES = [
  { id: '1', name: 'Solar Installation', slug: 'solar-installation' },
  { id: '2', name: 'Hairdressing', slug: 'hairdressing' },
  { id: '3', name: 'Mechanics', slug: 'mechanics' },
  { id: '4', name: 'Tailoring / Fashion', slug: 'tailoring-fashion' },
  { id: '5', name: 'Plumbing', slug: 'plumbing' },
  { id: '6', name: 'Electrical', slug: 'electrical' },
  { id: '7', name: 'Carpentry', slug: 'carpentry' },
  { id: '8', name: 'Painting', slug: 'painting' },
  { id: '9', name: 'Photography', slug: 'photography' },
  { id: '10', name: 'Catering / Chef', slug: 'catering-chef' },
  { id: '11', name: 'Software Engineering', slug: 'software-engineering' },
  { id: '12', name: 'Other', slug: 'other' },
];

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    // Categories are managed statically for now.
    throw new ConflictException('Dynamic category creation is not supported.');
  }

  async findAll() {
    return STATIC_CATEGORIES;
  }
}

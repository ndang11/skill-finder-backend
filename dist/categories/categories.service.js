"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
let CategoriesService = class CategoriesService {
    categories = [
        { id: 'cat-1', name: 'Solar Installer', slug: 'solar-installer' },
        { id: 'cat-2', name: 'Hairdresser', slug: 'hairdresser' },
        { id: 'cat-3', name: 'Mechanic', slug: 'mechanic' },
        { id: 'cat-4', name: 'Tailor/Fashion Designer', slug: 'tailor-fashion-designer' },
    ];
    async create(createCategoryDto) {
        const existing = this.categories.find((c) => c.slug === createCategoryDto.slug.toLowerCase());
        if (existing) {
            throw new common_1.ConflictException(`Category with slug ${createCategoryDto.slug} already exists`);
        }
        const newCategory = {
            id: `cat-${Date.now()}`,
            ...createCategoryDto,
            slug: createCategoryDto.slug.toLowerCase(),
        };
        this.categories.push(newCategory);
        return newCategory;
    }
    async findAll() {
        return this.categories;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)()
], CategoriesService);
//# sourceMappingURL=categories.service.js.map
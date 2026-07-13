import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<import("./entities/category.entity.js").Category[]>;
    create(createCategoryDto: CreateCategoryDto): Promise<import("./entities/category.entity.js").Category>;
}

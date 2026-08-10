import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<{
        id: string;
        name: string;
        nameFr: string;
        slug: string;
        sector: string;
        source: string;
    }[]>;
    create(createCategoryDto: CreateCategoryDto): Promise<void>;
}

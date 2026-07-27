import { PrismaService } from '../prisma/prisma.service.js';
import type { SearchProfessionalDto } from './dto/search-professional.dto.js';
import type { UpdateProfessionalDto } from './dto/update-professional.dto.js';
export declare class ProfessionalsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, categoryId: string, location: string): Promise<any>;
    findAll(searchDto: SearchProfessionalDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(userId: string, updateDto: UpdateProfessionalDto): Promise<any>;
    getAverageRating(professionalId: string): Promise<number>;
}

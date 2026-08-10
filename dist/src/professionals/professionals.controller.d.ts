import { ProfessionalsService } from './professionals.service.js';
import { SearchProfessionalDto } from './dto/search-professional.dto.js';
import { UpdateProfessionalDto } from './dto/update-professional.dto.js';
export declare class ProfessionalsController {
    private readonly professionalsService;
    constructor(professionalsService: ProfessionalsService);
    findAll(searchDto: SearchProfessionalDto): Promise<{
        id: any;
        userId: any;
        fullName: any;
        avatarUrl: any;
        category: any;
        location: any;
        bio: any;
        skills: any;
        averageRating: number;
        completedJobs: any;
        whatsappNumber: any;
    }[]>;
    findOne(id: string): Promise<{
        id: any;
        userId: any;
        fullName: any;
        avatarUrl: any;
        category: any;
        location: any;
        bio: any;
        skills: any;
        averageRating: number;
        completedJobs: any;
        whatsappNumber: any;
    }>;
    update(userId: string, updateDto: UpdateProfessionalDto): Promise<{
        id: any;
        userId: any;
        fullName: any;
        avatarUrl: any;
        category: any;
        location: any;
        bio: any;
        skills: any;
        averageRating: number;
        completedJobs: any;
        whatsappNumber: any;
    }>;
}

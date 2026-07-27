import { ProfessionalsService } from './professionals.service.js';
import { SearchProfessionalDto } from './dto/search-professional.dto.js';
import { UpdateProfessionalDto } from './dto/update-professional.dto.js';
export declare class ProfessionalsController {
    private readonly professionalsService;
    constructor(professionalsService: ProfessionalsService);
    findAll(searchDto: SearchProfessionalDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(userId: string, updateDto: UpdateProfessionalDto): Promise<any>;
}

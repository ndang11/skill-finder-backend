import { ProfessionalsService } from './professionals.service.js';
import { SearchProfessionalDto } from './dto/search-professional.dto.js';
import { UpdateProfessionalDto } from './dto/update-professional.dto.js';
export declare class ProfessionalsController {
    private readonly professionalsService;
    constructor(professionalsService: ProfessionalsService);
    findAll(searchDto: SearchProfessionalDto): Promise<import("./entities/professional.entity.js").Professional[]>;
    findOne(id: string): Promise<import("./entities/professional.entity.js").Professional>;
    update(userId: string, updateDto: UpdateProfessionalDto): Promise<import("./entities/professional.entity.js").Professional>;
}

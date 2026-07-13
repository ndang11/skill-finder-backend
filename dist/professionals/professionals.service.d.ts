import { Professional } from './entities/professional.entity.js';
import { SearchProfessionalDto } from './dto/search-professional.dto.js';
import { UpdateProfessionalDto } from './dto/update-professional.dto.js';
export declare class ProfessionalsService {
    private professionals;
    create(userId: string): Promise<Professional>;
    findAll(searchDto: SearchProfessionalDto): Promise<Professional[]>;
    findOne(id: string): Promise<Professional>;
    update(userId: string, updateDto: UpdateProfessionalDto): Promise<Professional>;
}

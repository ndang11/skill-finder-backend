import { ProfessionalsService } from './professionals.service';
import { SearchProfessionalDto } from './dto/search-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
export declare class ProfessionalsController {
    private readonly professionalsService;
    constructor(professionalsService: ProfessionalsService);
    findAll(searchDto: SearchProfessionalDto): Promise<import("./entities/professional.entity").Professional[]>;
    update(userId: string, updateDto: UpdateProfessionalDto): Promise<import("./entities/professional.entity").Professional>;
}

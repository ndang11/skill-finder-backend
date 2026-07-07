import { Controller, Get, Body, Patch, Query, UseGuards } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { SearchProfessionalDto } from './dto/search-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Get()
  findAll(@Query() searchDto: SearchProfessionalDto) {
    return this.professionalsService.findAll(searchDto);
  }

  @UseGuards(SupabaseAuthGuard)
  @Patch('profile')
  update(@GetUser('id') userId: string, @Body() updateDto: UpdateProfessionalDto) {
    return this.professionalsService.update(userId, updateDto);
  }
}

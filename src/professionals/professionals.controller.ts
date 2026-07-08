import { Controller, Get, Body, Patch, Query, UseGuards } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service.js';
import { SearchProfessionalDto } from './dto/search-professional.dto.js';
import { UpdateProfessionalDto } from './dto/update-professional.dto.js';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard.js';
import { GetUser } from '../common/decorators/get-user.decorator.js';

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

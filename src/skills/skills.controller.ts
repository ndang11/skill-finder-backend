import { Controller, Get, Param } from '@nestjs/common';
import { SkillsService } from './skills.service.js';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  findAll() {
    return this.skillsService.findAll();
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.skillsService.findByCategory(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }
}

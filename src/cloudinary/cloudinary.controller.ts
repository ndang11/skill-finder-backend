import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service.js';
import { SupabaseAuthGuard } from '../common/guards/supabase-auth.guard.js';

@Controller('cloudinary')
@UseGuards(SupabaseAuthGuard)
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Get('signature')
  getUploadSignature(@Query('folder') folder = 'skill-finder-uploads') {
    return this.cloudinaryService.generateSignature(folder);
  }
}
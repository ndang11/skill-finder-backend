import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // This decorator makes it available everywhere without re-importing PrismaModule
@Module({
  providers: [PrismaService],
  exports: [PrismaService], 
})
export class PrismaModule {}

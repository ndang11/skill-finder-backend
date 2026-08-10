var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PrismaService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
let PrismaService = PrismaService_1 = class PrismaService extends PrismaClient {
    logger = new Logger(PrismaService_1.name);
    constructor(configService) {
        const connectionString = configService.get('SUPABASE_DB_URL') ??
            configService.getOrThrow('DATABASE_URL');
        if (connectionString.includes('[YOUR-PASSWORD]')) {
            throw new Error('[PrismaService] SUPABASE_DB_URL still contains the placeholder "[YOUR-PASSWORD]". ' +
                'Please replace it with your actual Supabase database password in the .env file.');
        }
        const adapter = new PrismaPg({ connectionString });
        super({ adapter });
    }
    async onModuleInit() {
        await this.$connect();
        this.logger.log('Database connection established');
    }
    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Database connection closed');
    }
};
PrismaService = PrismaService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], PrismaService);
export { PrismaService };
//# sourceMappingURL=prisma.service.js.map
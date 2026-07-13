import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Register the global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Validate and transform all incoming request bodies automatically
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // strip unknown properties
      forbidNonWhitelisted: true, // throw on unknown properties
      transform: true,       // auto-transform payloads to DTO class instances
    }),
  );

  // Allow the frontend (Supabase-hosted or local Next.js) to reach the API
  app.enableCors({
    origin: [
      process.env.SUPABASE_URL ?? '', // Supabase project URL
      'http://localhost:3000', // Local Next.js dev server
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`✅  Skill Finder API running on http://localhost:${port}`);
}
bootstrap();

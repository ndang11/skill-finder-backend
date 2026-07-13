import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Register the global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

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

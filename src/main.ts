// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (Cross-Origin Resource Sharing)
  app.enableCors();

  // Use a global pipe to validate all incoming requests
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}
bootstrap();
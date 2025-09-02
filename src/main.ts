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

  const port = 3002;
  await app.listen(port);
 // console.log(`🚀 Server is running on http://localhost:${port}`);
}
bootstrap();

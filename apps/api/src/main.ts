import 'dotenv/config';
import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  //NOTE: Global prefix
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 5082);
}
bootstrap();

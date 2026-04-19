import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);

  //NOTE: Global prefix
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 5082);
}
bootstrap();

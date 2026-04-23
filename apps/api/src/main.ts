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

  // TODO 1: Custom Pipe — transform/validate query params beyond class-validator
  //         implement PipeTransform interface with a transform(value, metadata) method
  //         example: ParseSortPipe converts "?sort=name:asc" → { field: 'name', order: 'ASC' }
  //         use: @Query('sort', ParseSortPipe) sort in data.controller.ts
  //         register per-param: @Query('sort', new ParseSortPipe()) or globally via app.useGlobalPipes()

  // TODO 2: Event-Driven Side Effects — decouple actions from their consequences
  //         install: npm i @nestjs/event-emitter
  //         register EventEmitterModule.forRoot() in app.module.ts imports
  //         emit in service: this.eventEmitter.emit('project.created', { projectId, userId })
  //         handle in listener: @OnEvent('project.created') in a dedicated listener class
  //         example use case: log audit trail or trigger a webhook when a row/project changes

  await app.listen(process.env.PORT ?? 5082);
}
bootstrap();

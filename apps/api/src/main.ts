import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);

  //NOTE: Global prefix
  app.setGlobalPrefix('api/v1');

  // TODO 1: Exception Filter — wraps errors like ResponseInterceptor wraps success
  //         create src/common/filters/http-exception.filter.ts
  //         register globally: app.useGlobalFilters(new HttpExceptionFilter())
  //         result: { success: false, message: "...", statusCode: 404 }

  // TODO 2: Validation Pipe — auto-validates DTOs using class-validator decorators
  //         install: npm i class-validator class-transformer
  //         register: app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  //         then add @IsString(), @IsNotEmpty() etc. in your DTO files

  // TODO 3: Guards + JWT Auth — protect routes from unauthenticated requests
  //         install: npm i @nestjs/jwt @nestjs/passport passport passport-jwt
  //         create src/auth/auth.module.ts, jwt.strategy.ts, jwt-auth.guard.ts
  //         use: @UseGuards(JwtAuthGuard) on controllers or routes

  // TODO 4: Custom Decorators — extract current user from JWT cleanly
  //         create src/common/decorators/current-user.decorator.ts
  //         use: @CurrentUser() user: User in controller method params

  await app.listen(process.env.PORT ?? 5082);
}
bootstrap();

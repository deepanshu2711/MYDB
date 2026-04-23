import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ProjectsModule } from './projects/projects.module';
import { DatabaseModule } from './database/database.module';
import { TablesModule } from './tables/tables.module';
import { DataModule } from './data/data.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ProjectsModule,
    DatabaseModule,
    TablesModule,
    DataModule,
    EventEmitterModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

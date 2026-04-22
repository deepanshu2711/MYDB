import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ProjectsModule } from './projects/projects.module';
import { DatabaseModule } from './database/database.module';
import { TablesModule } from './tables/tables.module';
import { DataModule } from './data/data.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

@Module({
  imports: [ProjectsModule, DatabaseModule, TablesModule, DataModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}

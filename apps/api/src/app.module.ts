import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { DatabaseModule } from './database/database.module';
import { TablesModule } from './tables/tables.module';

@Module({
  imports: [ProjectsModule, DatabaseModule, TablesModule],
})
export class AppModule {}

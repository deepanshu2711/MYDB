import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { DatabaseModule } from './database/database.module';
import { TablesModule } from './tables/tables.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [ProjectsModule, DatabaseModule, TablesModule, DataModule],
})
export class AppModule {}

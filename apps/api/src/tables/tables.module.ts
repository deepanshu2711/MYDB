import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TablesRepository } from './tables.repository';
import { SchemaOwnershipGuard } from 'src/auth/schema-ownership-gaurd';
import { ProjectsRepository } from 'src/projects/projects.repository';

@Module({
  controllers: [TablesController],
  providers: [TablesService, TablesRepository, ProjectsRepository, SchemaOwnershipGuard],
})
export class TablesModule {}

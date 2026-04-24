import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { SchemaOwnershipGuard } from 'src/auth/schema-ownership-gaurd';
import { ProjectsRepository } from 'src/projects/projects.repository';

@Module({
  controllers: [DataController],
  providers: [DataService, ProjectsRepository, SchemaOwnershipGuard],
})
export class DataModule {}

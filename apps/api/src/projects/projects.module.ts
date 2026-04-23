import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsRepository } from './projects.repository';
import { ProjectsListener } from './projects.listener';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository, ProjectsListener],
})
export class ProjectsModule {}

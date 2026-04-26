import { Module } from '@nestjs/common';
import { ProjectsRepository } from 'src/projects/projects.repository';
import { QueryEngineController } from './query-engine.controller';
import { QueryEngineService } from './query-engine.service';

@Module({
  controllers: [QueryEngineController],
  providers: [QueryEngineService, ProjectsRepository],
})
export class QueryEngineModule {}

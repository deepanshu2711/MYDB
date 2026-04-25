import * as bcrypt from 'bcrypt';

import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { initializeDatabaseSchema } from '@repo/db';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { buildConnectionString, createSchemaName } from './projects.utils';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly projectsRepo: ProjectsRepository,
  ) {}

  async create(dto: CreateProjectDto, globalUserId: string) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const schema_name = createSchemaName(dto.name);

    const project = await this.projectsRepo.insert(
      dto.name,
      hashedPassword,
      schema_name,
      globalUserId,
    );

    //NOTE:  initialize schema, create user and grant permissions
    await initializeDatabaseSchema(schema_name, dto.password);
    this.eventEmitter.emit('project.created', { project });

    return project;
  }

  async findAll(globalUserId: string) {
    const res = await this.projectsRepo.findAll(globalUserId);
    return res;
  }

  async findOne(id: string, globalUserId: string) {
    const res = await this.projectsRepo.findById(id, globalUserId);
    return { ...res, connection_string: buildConnectionString(res.schema_name) };
  }

  async update(id: string, dto: UpdateProjectDto, globalUserId: string) {
    const { name } = dto;
    const res = await this.projectsRepo.update(id, globalUserId, name!);
    return res;
  }

  async remove(id: string, globalUserId: string) {
    const project = await this.projectsRepo.findById(id, globalUserId);
    await this.projectsRepo.delete(id, globalUserId);
    this.eventEmitter.emit('project.deleted', { project });
    return { message: 'Deleted' };
  }
}

import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { initializeDatabaseSchema } from '@repo/db';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { createSchemaName } from './projects.utils';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepo: ProjectsRepository) {}

  async create(dto: CreateProjectDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const schema_name = createSchemaName(dto.name);

    const project = await this.projectsRepo.insert(
      dto.name,
      hashedPassword,
      schema_name,
    );

    //NOTE:  initialize schema, create user and grant permissions
    await initializeDatabaseSchema(schema_name, dto.password);

    return project;
  }

  async findAll() {
    const res = await this.projectsRepo.findAll();
    return res;
  }

  async findOne(id: string) {
    const res = await this.projectsRepo.findById(id);
    return res;
  }

  async update(id: number, dto: UpdateProjectDto) {
    const { name } = dto;
    const res = await this.projectsRepo.update(id, name!);
    return res;
  }

  async remove(id: number) {
    await this.projectsRepo.delete(id);
    return { message: 'Deleted' };
  }
}

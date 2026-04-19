import * as bcrypt from 'bcrypt';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Pool, initializeDatabaseSchema } from '@repo/db';
import { createSchemaName } from './projects.utils';

@Injectable()
export class ProjectsService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async create(createProjectDto: CreateProjectDto) {
    const hashedPassword = await bcrypt.hash(createProjectDto.password, 10);
    const schema_name = createSchemaName(createProjectDto.name);

    const res = await this.pool.query(
      'INSERT INTO projects(name,password,schema_name) VALUES($1,$2,$3) RETURNING *',
      [createProjectDto.name, hashedPassword, schema_name],
    );

    //NOTE:  initialize schema, create user and grant permissions
    await initializeDatabaseSchema(schema_name, createProjectDto.password);

    return res.rows[0];
  }

  async findAll() {
    const res = await this.pool.query('SELECT * FROM projects');
    return res.rows;
  }

  async findOne(id: string) {
    const res = await this.pool.query('SELECT * FROM projects WHERE Id = $1', [
      id,
    ]);
    if (res.rows.length === 0) throw new NotFoundException('Project not found');
    return res.rows[0];
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { name } = updateProjectDto;

    const res = await this.pool.query(
      'UPDATE projects SET name = $1 WHERE id = $2 RETURNING *',
      [name, id],
    );

    if (res.rows.length === 0) {
      throw new NotFoundException('Project not found');
    }

    return res.rows[0];
  }

  async remove(id: number) {
    await this.pool.query('DELETE FROM projects WHERE id = $1', [id]);
    return { message: 'Deleted' };
  }
}

import { Inject, NotFoundException } from '@nestjs/common';
import { Pool } from '@repo/db';
import { PROJECT_QUERIES } from './projects.queries';

export class ProjectsRepository {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async insert(name: string, hashedPassword: string, schemaName: string) {
    const { rows } = await this.pool.query(PROJECT_QUERIES.INSERT, [
      name,
      hashedPassword,
      schemaName,
    ]);
    return rows[0];
  }

  async findAll() {
    const { rows } = await this.pool.query(PROJECT_QUERIES.FIND_ALL);
    return rows;
  }

  async findById(id: string) {
    const { rows } = await this.pool.query(PROJECT_QUERIES.FIND_BY_ID[id]);
    if (!rows[0]) throw new NotFoundException(`Project #${id} not found`);
    return rows[0];
  }

  async update(id: number, name: string) {
    const { rows } = await this.pool.query(PROJECT_QUERIES.UPDATE, [name, id]);
    if (!rows[0]) throw new NotFoundException(`Project #${id} not found`);
    return rows[0];
  }

  async delete(id: number) {
    await this.pool.query(PROJECT_QUERIES.DELETE, [id]);
  }
}

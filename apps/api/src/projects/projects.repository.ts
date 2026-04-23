import { Inject, NotFoundException } from '@nestjs/common';
import { Pool } from '@repo/db';
import { PROJECT_QUERIES } from './projects.queries';

export class ProjectsRepository {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async insert(
    name: string,
    hashedPassword: string,
    schemaName: string,
    globalUserId: string,
  ) {
    const { rows } = await this.pool.query(PROJECT_QUERIES.INSERT, [
      name,
      hashedPassword,
      schemaName,
      globalUserId,
    ]);
    return rows[0];
  }

  async findAll(globalUserId: string) {
    const { rows } = await this.pool.query(PROJECT_QUERIES.FIND_ALL, [
      globalUserId,
    ]);
    return rows;
  }

  async findById(id: string, globalUserId: string) {
    const { rows } = await this.pool.query(PROJECT_QUERIES.FIND_BY_ID, [
      id,
      globalUserId,
    ]);
    if (!rows[0]) throw new NotFoundException(`Project #${id} not found`);
    return rows[0];
  }

  async update(id: string, globalUserId: string, name: string) {
    const { rows } = await this.pool.query(PROJECT_QUERIES.UPDATE, [
      name,
      id,
      globalUserId,
    ]);
    if (!rows[0]) throw new NotFoundException(`Project #${id} not found`);
    return rows[0];
  }

  async delete(id: string, globalUserId: string) {
    await this.pool.query(PROJECT_QUERIES.DELETE, [id, globalUserId]);
  }
}

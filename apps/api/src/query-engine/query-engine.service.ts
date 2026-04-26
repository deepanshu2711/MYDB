import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { Pool } from '@repo/db';
import { QueryBuilder } from '@repo/core';
import { ProjectsRepository } from 'src/projects/projects.repository';
import { QueryRequestDto } from './dto/query-request.dto';

@Injectable()
export class QueryEngineService {
  constructor(
    @Inject('PG_POOL') private pool: Pool,
    private readonly projectsRepo: ProjectsRepository,
  ) {}

  async execute(projectId: string, sql: string, globalUserId: string) {
    const project = await this.projectsRepo.findById(projectId, globalUserId);
    const { schema_name } = project;
    return this.runQuery(schema_name, sql, []);
  }

  async query(projectId: string, dto: QueryRequestDto, globalUserId: string) {
    const project = await this.projectsRepo.findById(projectId, globalUserId);
    const { schema_name } = project;

    let built: { sql: string; params: any[] };
    try {
      built = QueryBuilder.build({ ...dto, schema: schema_name });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to build query';
      throw new BadRequestException(message);
    }

    return this.runQuery(schema_name, built.sql, built.params);
  }

  private async runQuery(schema: string, sql: string, params: any[]) {
    const start = Date.now();

    try {
      await this.pool.query(`SET search_path TO "${schema}", public`);
      const result = await this.pool.query(
        sql,
        params.length ? params : undefined,
      );
      const executionTimeMs = Date.now() - start;

      const columns = (result.fields ?? []).map((f) => f.name);
      const rows = result.rows ?? [];
      const rowCount = result.rowCount ?? rows.length;

      return { columns, rows, rowCount, executionTimeMs };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Query execution failed';
      throw new BadRequestException(message);
    } finally {
      await this.pool.query('RESET search_path').catch(() => {});
    }
  }
}

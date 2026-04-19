import { Inject, Injectable } from '@nestjs/common';
import { Pool } from '@repo/db';
import { CreateTableDto } from './dto/create-table.dto';

@Injectable()
export class TablesService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async create(projectId: string, dto: CreateTableDto) {}
  async findAll(projectId: string) {}
  async findOne(projectId: string, tableName: string) {}
  async delete(projectId: string, tableName: string) {}
}

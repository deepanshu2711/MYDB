import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from '@repo/db';
import { CreateTableDto } from './dto/create-table.dto';

@Injectable()
export class TablesService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async create(projectId: string, dto: CreateTableDto) {
    const { rows } = await this.pool.query(
      'SELECT schema_name from projects where id = $1',
      [projectId],
    );
    if (rows.length === 0) throw new NotFoundException('Project not found');

    const schema_name = rows[0].schema_name;

    const cols = dto.columns
      .map((col) => {
        let line = `${col.name} ${col.type}`;
        if (col.primary) line += ' PRIMARY KEY';
        if (col.unique) line += ' UNIQUE';
        return line;
      })
      .join(', ');

    const sql = `CREATE TABLE ${schema_name}.${dto.name} (
        ${cols}
      );`;

    await this.pool.query(sql);
    return { message: 'Table created successfully' };
  }
  async findAll(projectId: string) {}
  async findOne(projectId: string, tableName: string) {}
  async delete(projectId: string, tableName: string) {}
}

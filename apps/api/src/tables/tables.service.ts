import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from '@repo/db';
import { CreateTableDto } from './dto/create-table.dto';

@Injectable()
export class TablesService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async create(schema_name: string, dto: CreateTableDto) {
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

  async findAll(schema_name: string) {
    const sql = `SELECT tablename FROM pg_tables WHERE schemaname = '${schema_name}'`;
    const { rows: tables } = await this.pool.query(sql);

    return { message: 'Success', tables };
  }

  async findOne(schema_name: string, tableName: string) {
    const { rows: columns } = await this.pool.query(
      `
    SELECT 
      column_name,
      data_type,
      is_nullable,
      column_default
    FROM information_schema.columns
    WHERE table_schema = $1
      AND table_name = $2
    ORDER BY ordinal_position;
    `,
      [schema_name, tableName],
    );

    if (columns.length === 0) {
      throw new NotFoundException('Table not found in schema');
    }

    return {
      schema: schema_name,
      table: tableName,
      columns,
    };
  }

  async delete(schema_name: string, tableName: string) {
    const sql = `DROP TABLE ${schema_name}.${tableName}`;
    await this.pool.query(sql);
    return { message: 'Success' };
  }
}

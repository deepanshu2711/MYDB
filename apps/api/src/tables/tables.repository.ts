import { Inject, NotFoundException } from '@nestjs/common';
import { Pool } from '@repo/db';
import { CreateTableDto } from './dto/create-table.dto';
import { TABLE_QUERIES } from './tables.queries';

export class TablesRepository {
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

    await this.pool.query(TABLE_QUERIES.CREATE(schema_name, dto.name, cols));
  }

  async findAll(schema_name: string) {
    const { rows } = await this.pool.query(TABLE_QUERIES.FIND_ALL, [
      schema_name,
    ]);
    return rows;
  }

  async findOne(schema_name: string, tableName: string) {
    const { rows } = await this.pool.query(TABLE_QUERIES.FIND_ONE, [
      schema_name,
      tableName,
    ]);
    if (rows.length === 0)
      throw new NotFoundException('Table not found in schema');
    return rows;
  }

  async delete(schema_name: string, tableName: string) {
    await this.pool.query(TABLE_QUERIES.DELETE(schema_name, tableName));
  }
}

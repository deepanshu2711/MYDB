import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { TablesRepository } from './tables.repository';

@Injectable()
export class TablesService {
  constructor(private readonly tablesRepo: TablesRepository) {}

  async create(schema_name: string, dto: CreateTableDto) {
    await this.tablesRepo.create(schema_name, dto);
    return { message: 'Table created successfully' };
  }

  async findAll(schema_name: string) {
    const tables = await this.tablesRepo.findAll(schema_name);
    return { message: 'Success', tables };
  }

  async findOne(schema_name: string, tableName: string) {
    const columns = await this.tablesRepo.findOne(schema_name, tableName);
    return { schema: schema_name, table: tableName, columns };
  }

  async delete(schema_name: string, tableName: string) {
    await this.tablesRepo.delete(schema_name, tableName);
    return { message: 'Success' };
  }
}

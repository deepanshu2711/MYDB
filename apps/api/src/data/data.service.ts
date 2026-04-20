import { Inject, Injectable } from '@nestjs/common';
import { Pool } from '@repo/db';

import { CreateDatumDto } from './dto/create-row.dto';
import { SelectRowDto } from './dto/select-row.dto';

import {
  makeDeleteQuery,
  makeInsertQuery,
  makeSelectQuery,
  makeUpdateQuery,
} from './factories/query-request.factory';
import { UpdateRowDto } from './dto/update-row.dto';
import { DeleteRowDto } from './dto/delete-row.dto';

@Injectable()
export class DataService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  create(dto: CreateDatumDto, schemaName: string, tableName: string) {
    const query = makeInsertQuery(schemaName, tableName, dto.data);
  }

  findAll(schemaName: string, tableName: string, options: SelectRowDto) {
    const query = makeSelectQuery(schemaName, tableName, {
      limit: options.limit,
    });
  }

  update(dto: UpdateRowDto, schemaName: string, tableName: string) {
    const query = makeUpdateQuery(schemaName, tableName, dto.data, dto.filter);
  }

  remove(dto: DeleteRowDto, schemaName: string, tableName: string) {
    const query = makeDeleteQuery(schemaName, tableName, dto.filter);
  }
}

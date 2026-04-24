import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { JwksAuthGuard } from 'src/auth/jwks-auth.guard';
import { SchemaOwnershipGuard } from 'src/auth/schema-ownership-gaurd';

@UseGuards(JwksAuthGuard, SchemaOwnershipGuard)
@Controller('projects/:schemaName/tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(
    @Param('schemaName') schemaName: string,
    @Body() createTableDto: CreateTableDto,
  ) {
    return this.tablesService.create(schemaName, createTableDto);
  }

  @Get()
  list(@Param('schemaName') schemaName: string) {
    return this.tablesService.findAll(schemaName);
  }

  @Get(':tableName')
  describe(
    @Param('schemaName') schemaName: string,
    @Param('tableName') tableName: string,
  ) {
    return this.tablesService.findOne(schemaName, tableName);
  }

  @Delete(':tableName')
  drop(
    @Param('schemaName') schemaName: string,
    @Param('tableName') tableName: string,
  ) {
    return this.tablesService.delete(schemaName, tableName);
  }
}

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';

@Controller('projects/:projectId/tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(
    @Param('projectId') projectId: string,
    @Body() createTableDto: CreateTableDto,
  ) {
    return this.tablesService.create(projectId, createTableDto);
  }

  @Get()
  list(@Param('projectId') projectId: string) {
    return this.tablesService.findAll(projectId);
  }

  @Get(':tableName')
  describe(
    @Param('projectId') projectId: string,
    @Param('tableName') tableName: string,
  ) {
    return this.tablesService.findOne(projectId, tableName);
  }

  @Delete(':tableName')
  drop(
    @Param('projectId') projectId: string,
    @Param('tableName') tableName: string,
  ) {
    return this.tablesService.delete(projectId, tableName);
  }
}

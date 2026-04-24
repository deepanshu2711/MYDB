import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-row.dto';
import { SelectRowDto } from './dto/select-row.dto';
import { UpdateRowDto } from './dto/update-row.dto';
import { DeleteRowDto } from './dto/delete-row.dto';
import { JwksAuthGuard } from 'src/auth/jwks-auth.guard';
import { SchemaOwnershipGuard } from 'src/auth/schema-ownership-gaurd';

@UseGuards(JwksAuthGuard, SchemaOwnershipGuard)
@Controller('data/:schemaName/:tableName')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  create(
    @Param('schemaName') schemaName: string,
    @Param('tableName') tableName: string,
    @Body() createDatumDto: CreateDatumDto,
  ) {
    return this.dataService.create(createDatumDto, schemaName, tableName);
  }

  @Get()
  findAll(
    @Param('schemaName') schemaName: string,
    @Param('tableName') tableName: string,
    @Query() query: SelectRowDto,
  ) {
    return this.dataService.findAll(schemaName, tableName, query);
  }

  @Patch()
  update(
    @Param('schemaName') schemaName: string,
    @Param('tableName') tableName: string,
    @Body() dto: UpdateRowDto,
  ) {
    return this.dataService.update(dto, schemaName, tableName);
  }

  @Delete()
  remove(
    @Param('schemaName') schemaName: string,
    @Param('tableName') tableName: string,
    @Body() dto: DeleteRowDto,
  ) {
    return this.dataService.remove(dto, schemaName, tableName);
  }
}

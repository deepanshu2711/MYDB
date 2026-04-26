import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwksAuthGuard } from 'src/auth/jwks-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ExecuteQueryDto } from './dto/execute-query.dto';
import { QueryRequestDto } from './dto/query-request.dto';
import { QueryEngineService } from './query-engine.service';

@UseGuards(JwksAuthGuard)
@Controller('query-engine')
export class QueryEngineController {
  constructor(private readonly queryEngineService: QueryEngineService) {}

  @Post(':projectId/execute')
  execute(
    @Param('projectId') projectId: string,
    @Body() dto: ExecuteQueryDto,
    @CurrentUser('globalUserId') globalUserId: string,
  ) {
    return this.queryEngineService.execute(projectId, dto.sql, globalUserId);
  }

  @Post(':projectId/query')
  query(
    @Param('projectId') projectId: string,
    @Body() dto: QueryRequestDto,
    @CurrentUser('globalUserId') globalUserId: string,
  ) {
    return this.queryEngineService.query(projectId, dto, globalUserId);
  }
}

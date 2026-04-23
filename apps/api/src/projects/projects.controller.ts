import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwksAuthGuard } from 'src/auth/jwks-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(JwksAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @CurrentUser('globalUserId') globalUserId: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(createProjectDto, globalUserId);
  }

  @Get()
  findAll(@CurrentUser('globalUserId') globalUserId: string) {
    return this.projectsService.findAll(globalUserId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser('globalUserId') globalUserId: string,
  ) {
    return this.projectsService.findOne(id, globalUserId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser('globalUserId') globalUserId: string,
  ) {
    return this.projectsService.update(id, updateProjectDto, globalUserId);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser('globalUserId') globalUserId: string,
  ) {
    return this.projectsService.remove(id, globalUserId);
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectsRepository } from 'src/projects/projects.repository';

@Injectable()
export class SchemaOwnershipGuard implements CanActivate {
  constructor(private projectsRepository: ProjectsRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) throw new UnauthorizedException();

    const { globalUserId } = request.user;
    const { schemaName } = request.params;

    if (!globalUserId || !schemaName)
      throw new ForbiddenException('Invalid request');

    const owns = await this.projectsRepository.existsBySchema(
      schemaName,
      globalUserId,
    );
    if (!owns) throw new ForbiddenException('You do not own this schema');

    return true;
  }
}

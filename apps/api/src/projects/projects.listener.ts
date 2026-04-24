import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { teardownDatabaseSchema } from '@repo/db';

@Injectable()
export class ProjectsListener {
  private readonly logger = new Logger(ProjectsListener.name);

  @OnEvent('project.created')
  handleProjectCreated(payload: { project: any }) {
    this.logger.log(`New project created: ${payload.project.name}`);
    // NOTE: shoot the email in future when a project is created
  }

  @OnEvent('project.deleted')
  async handleProjectDeleted(payload: { project: any }) {
    const { schema_name, name } = payload.project;
    this.logger.log(`Tearing down schema for deleted project: ${name}`);
    await teardownDatabaseSchema(schema_name);
  }
}

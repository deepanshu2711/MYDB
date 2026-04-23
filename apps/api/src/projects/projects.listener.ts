import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ProjectsListener {
  private readonly logger = new Logger(ProjectsListener.name);

  @OnEvent('project.created')
  handleProjectCreated(payload: { project: any }) {
    this.logger.log(`New project created: ${payload.project.name}`);
    // could call a webhook, send an email, write an audit log, etc.
    // NOTE: shoot the email in future when a project is created
  }
}

import { Controller, Get } from '@nestjs/common'
import { ProjectsService } from '../providers'

@Controller({
  path: 'projects',
})
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('')
  async getAllProjects() {
    return this.projectsService.getAllProjects()
  }
}

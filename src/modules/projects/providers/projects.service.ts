import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '@/lib/db/drizzle.service'
import { projectsTable } from '@/lib/db/schema'

@Injectable()
export class ProjectsService {
  constructor(private readonly drizzleService: DrizzleService) {}

  getAllProjects() {
    return this.drizzleService.db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.isActive, true))
  }
}

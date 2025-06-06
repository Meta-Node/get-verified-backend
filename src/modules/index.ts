import { Module } from '@nestjs/common'
import { UsersModule } from './users'
import { ProjectsModule } from './projects'

@Module({
  imports: [UsersModule, ProjectsModule],
})
export class BaseModule {}

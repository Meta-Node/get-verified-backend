import { Module } from '@nestjs/common'
import { CONTROLLERS } from './controllers'
import { PROVIDERS } from './providers'
import { DrizzleService } from '../../lib/db/drizzle.service'

@Module({
  controllers: [...CONTROLLERS],
  providers: [...PROVIDERS, DrizzleService],
})
export class ProjectsModule {}

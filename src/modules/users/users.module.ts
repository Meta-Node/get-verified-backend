import { Module } from '@nestjs/common'
import { CONTROLLERS } from './controllers'
import { PROVIDERS } from './providers'

@Module({
  controllers: [...CONTROLLERS],
  providers: [...PROVIDERS],
})
export class UsersModule {}

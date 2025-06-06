import { Module } from '@nestjs/common'
import { UsersModule } from './modules/users/users.module'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.register({
      global: true,
    }),
  ],
})
export class AppModule {}

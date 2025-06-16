import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { UsersService } from '../providers'
import { LoginDto } from '../dto'

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('notifications')
  async getNotifications(@Query('userId') userId: string) {
    if (!userId) {
      throw new Error('User ID is required')
    }
    return this.usersService.getNotifications(userId)
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto.email, loginDto.integration)
  }
}

import { Body, Controller, Post } from '@nestjs/common'
import { UsersService } from '../providers'

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() email: string) {
    return this.usersService.login(email)
  }
}

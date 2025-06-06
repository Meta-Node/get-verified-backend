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

  @Post('share')
  async share(
    @Body()
    { brightId, contactInfo }: { brightId: string; contactInfo: string },
  ) {
    return this.usersService.shareInformation(brightId, contactInfo)
  }

  @Post('query-contacts')
  async queryContacts(@Body() contacts: string[]) {
    return this.usersService.queryContacts(contacts)
  }
}

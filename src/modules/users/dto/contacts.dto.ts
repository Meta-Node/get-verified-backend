import { ApiProperty } from '@nestjs/swagger'

export class ContactsDto {
  @ApiProperty({ type: [String] })
  contacts: string[]
}

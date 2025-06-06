import { ApiProperty } from '@nestjs/swagger'

export class ShareDto {
  @ApiProperty()
  brightId: string

  @ApiProperty()
  contactInfo: string
}

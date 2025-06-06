import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as crypto from 'crypto'
import { GistService } from './gist.service'
import { usersTable } from '../../../lib/db/schema'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '../../../lib/db/drizzle.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly gistService: GistService,
    private readonly dbService: DrizzleService,
  ) {}

  async login(email: string, integration: string) {
    const hashedEmail = this.hashContactInfo(email)

    const db = this.dbService.getDb()

    const res = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, hashedEmail))

    if (!res.length) {
      const brightId = this.createBrightId(email)

      await db.insert(usersTable).values({
        email: hashedEmail,
        id: brightId,
        integrations: [integration],
      })

      await this.shareInformation(brightId, email)

      return {
        id: brightId,
      }
    }

    return {
      id: res[0].id,
    }
  }

  async queryContacts(contacts: string[]) {
    const hashedContacts = contacts.map((contact) =>
      this.hashContactInfo(contact),
    )

    const res = []

    for (const contact of hashedContacts) {
      const gist = await this.gistService.getGist(contact)
      if (gist) {
        res.push(gist)
      }
    }

    return res
  }

  async shareInformation(brightId: string, contactInfo: string) {
    const hashedEmail = this.hashContactInfo(contactInfo)

    const filename = `${hashedEmail}.json`

    const content = JSON.stringify({ id: brightId })

    await this.gistService.createGist(
      content,
      filename,
      'aura contact information',
      true,
    )
  }

  private hashContactInfo(contactInfo: string): string {
    const secretKey = this.configService.getOrThrow('SECRET_KEY')

    return crypto
      .createHmac('sha256', secretKey)
      .update(contactInfo)
      .digest('base64')
      .slice(0, 43)
  }

  private createBrightId(email: string) {
    const secretKey = this.configService.getOrThrow('SECRET_KEY')

    return crypto
      .scryptSync(email, secretKey, 32)
      .toString('base64')
      .slice(0, 43)
  }
}

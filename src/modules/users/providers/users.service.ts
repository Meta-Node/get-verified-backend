import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as crypto from 'crypto'
import {
  contactsTable,
  notificationsTable,
  usersTable,
} from '../../../lib/db/schema'
import { desc, eq, inArray } from 'drizzle-orm'
import { DrizzleService } from '../../../lib/db/drizzle.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly dbService: DrizzleService,
  ) {}

  async getNotifications(toUserId: string) {
    const notifications = await this.dbService.db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.toUserId, toUserId))
      .orderBy(desc(notificationsTable.createdAt))
      .limit(100)
      .execute()

    return notifications.map((notification) => ({
      id: notification.id,
      fromUserId: notification.fromUserId,
      message: notification.message,
      createdAt: notification.createdAt,
    }))
  }

  async login(email: string, integration: string) {
    const hashedEmail = this.createBrightId(email)

    const db = this.dbService.getDb()

    const res = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, hashedEmail))

    if (!res.length) {
      const brightId = this.createBrightId(email)

      await db.insert(usersTable).values({
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
      this.createBrightId(contact),
    )

    const users = await this.dbService.db
      .select()
      .from(contactsTable)
      .where(inArray(contactsTable.contactId, hashedContacts))

    const notifications = users.map((user) => ({
      toUserId: user.userId,
      fromUserId: user.contactId,
      message: 'A contact viewed your profile',
      createdAt: new Date(),
    }))

    await this.dbService.db.insert(notificationsTable).values(notifications)

    return users.map((user) => user.id)
  }

  async shareInformation(brightId: string, contactInfo: string) {
    const hashedEmail = this.createBrightId(contactInfo)

    await this.dbService.db.insert(contactsTable).values({
      userId: brightId,
      contactId: hashedEmail,
      createdAt: new Date(),
    })

    return {
      message: 'Contact information shared successfully',
    }
  }

  private createBrightId(email: string) {
    const secretKey = this.configService.getOrThrow('SECRET_KEY')

    return crypto
      .scryptSync(email, secretKey, 32)
      .toString('base64')
      .slice(0, 43)
  }
}

import { Injectable } from '@nestjs/common'
import { DrizzleService } from '@/lib/db/drizzle.service'
import { notificationsTable } from '@/lib/db/schema'

@Injectable()
export class NotificationsService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async createUserQueries(userId: string, contacts: string[]) {
    const queries = contacts.map((contact) =>
      this.drizzleService.db
        .insert(notificationsTable)
        .values({
          fromUserId: userId,
          toUserId: contact,
          message: 'Viewed your profile as a contact',
        })
        .execute(),
    )

    if (queries.length > 0) await Promise.all(queries)
  }
}

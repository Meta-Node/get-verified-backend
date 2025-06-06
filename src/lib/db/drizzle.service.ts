import { NeonQueryFunction } from '@neondatabase/serverless'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http'

@Injectable()
export class DrizzleService {
  private readonly db: NeonHttpDatabase<Record<string, never>> & {
    $client: NeonQueryFunction<any, any>
  }

  constructor(private configService: ConfigService) {
    const databaseUrl = this.configService.get<string>('DATABASE_URL')
    this.db = drizzle(databaseUrl)
  }

  getDb() {
    return this.db
  }
}

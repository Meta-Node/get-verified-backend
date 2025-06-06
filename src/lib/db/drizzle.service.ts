import { NeonQueryFunction } from '@neondatabase/serverless'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http'

@Injectable()
export class DrizzleService {
  private readonly _db: NeonHttpDatabase<Record<string, never>> & {
    $client: NeonQueryFunction<any, any>
  }

  public get db() {
    return this._db
  }

  constructor(private configService: ConfigService) {
    const databaseUrl = this.configService.get<string>('DATABASE_URL')
    this._db = drizzle(databaseUrl)
  }

  getDb() {
    return this._db
  }
}

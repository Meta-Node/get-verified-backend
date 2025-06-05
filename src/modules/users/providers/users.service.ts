import { Injectable } from '@nestjs/common'
import { randomBytes, scryptSync } from 'crypto'

const generateSaltAndHash = (email: string): { salt: string; hash: string } => {
  const salt = randomBytes(32).toString('hex') // 32-byte random salt
  const hash = scryptSync(email, salt, 32).toString('hex') // 32-byte hash
  return { salt, hash }
}

@Injectable()
export class UsersService {
  constructor() {}

  async login(email: string) {
    return { email }
  }

  async hashTable() {
    // Example usage
    const email = 'user@example.com'
    const { salt, hash } = generateSaltAndHash(email)
    console.log('Salt (store securely):', salt)
    console.log('Hashed email:', hash)
  }
}

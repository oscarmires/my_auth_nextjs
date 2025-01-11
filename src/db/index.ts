import 'dotenv/config'

console.log('DATABASE_URL:', process.env.DATABASE_URL) // Add this line to check if the variable is loaded

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined')
}

export const client = postgres(connectionString)
export const db = drizzle(client)

console.log(db)

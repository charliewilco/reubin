import { PrismaClient } from '@prisma/client'
import { Client } from "pg"

describe('example test with Prisma Client', () => {
  let prisma = new PrismaClient()

  let pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT ?? '80'),
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
});

  beforeAll(async () => {
    await pgclient.connect();
  
    console.log(pgclient.database?.toString())
  })

  afterAll(async () => {
    await pgclient.end()
  })

  test('test query', async () => {
    console.log(process.env.DATABASE_URL)
  })
})
import { Auth } from './auth'
import { Email } from './email'
import { prisma } from './orm'
import { Payments } from './payments'
import { redis } from './kv'

// biome-ignore lint/complexity/noStaticOnlyClass: it makes me happy
export class Services {
	static mail = new Email()
	static auth = Auth
	static kv = redis
	static payments = new Payments()
}

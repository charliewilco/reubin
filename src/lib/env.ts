import { z } from 'zod'

const ENV_VARS_SCHEMA = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']),
	DATABASE_URL: z.string(),
	UPSTASH_REDIS_REST_URL: z.string(),
	UPSTASH_REDIS_REST_TOKEN: z.string(),
	STRIPE_PUBLIC_KEY: z.string(),
	STRIPE_SECRET_KEY: z.string(),
	RESEND_API_KEY: z.string(),
	COHERE_API_KEY: z.string(),
})

type EnvType = z.infer<typeof ENV_VARS_SCHEMA>

const safeResult = ENV_VARS_SCHEMA.safeParse(process.env)

export const env: EnvType = safeResult.success
	? safeResult.data
	: {
			NODE_ENV: 'development',
			DATABASE_URL: '...',
			UPSTASH_REDIS_REST_URL: '...',
			UPSTASH_REDIS_REST_TOKEN: '...',
			STRIPE_PUBLIC_KEY: '...',
			STRIPE_SECRET_KEY: '...',
			RESEND_API_KEY: '...',
			COHERE_API_KEY: '...',
		}

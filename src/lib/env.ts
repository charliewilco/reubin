import { z } from "zod";

const ENV_VARS_SCHEMA = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]),
	DATABASE_URL: z.string(),
	STRIPE_PUBLIC_KEY: z.string(),
	STRIPE_SECRET_KEY: z.string(),
	RESEND_API_KEY: z.string(),
});

export type EnvType = z.infer<typeof ENV_VARS_SCHEMA>;

export class Env {
	// Parse and validate environment variables
	static $vars: EnvType = ENV_VARS_SCHEMA.parse(process.env);
}

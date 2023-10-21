import dotenv from 'dotenv';
import { z } from 'zod';

if (process.env.NODE_ENV !== 'production') {
  const envFound = dotenv.config();
  if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }
}

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'staging', 'development', 'test']).optional(),
  TOKEN_KEY: z.string().optional(),
  PORT: z.string().default('8000'),
});

try {
  envSchema.parse(process.env);
} catch (error: any) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? '8000',
  tokenKey: process.env.TOKEN_KEY ?? '4f88a7eb-eb41-4960-9fa1-ee712d90e978',
  corsAllowedHosts: [''],
};

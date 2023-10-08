import path from 'path';

import dotenv from 'dotenv';
import { z } from 'zod';

const envFound = dotenv.config({ path: path.join(__dirname, '../../.env') });
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'staging', 'development', 'test']).optional(),
  TOKEN_KEY: z.string(),
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
  tokenKey: process.env.TOKEN_KEY ?? '',
  corsAllowedHosts: [''],
};

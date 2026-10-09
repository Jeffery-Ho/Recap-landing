import { existsSync, readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

// Match production .env precedence; externally supplied variables win.
export function releaseEnvironment() {
  const values = {};
  for (const file of ['.env', '.env.local', '.env.production', '.env.production.local']) {
    if (existsSync(file)) Object.assign(values, parseEnv(readFileSync(file, 'utf8')));
  }
  return { ...values, ...process.env };
}

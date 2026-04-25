import { createHash } from 'crypto';

export function buildConnectionString(schemaName: string): string {
  const url = new URL(process.env['DATABASE_URL']!);
  const dbUser = `${schemaName}_user`;
  return `postgresql://${dbUser}:********@${url.host}/neondb?sslmode=require`;
}

export function createSchemaName(projectName: string): string {
  const slug = projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 24);

  const hash = createHash('sha256')
    .update(projectName.trim().toLowerCase())
    .digest('hex')
    .slice(0, 6);

  return `${slug}_${hash}`;
}

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { log } from './vite';
import * as schema from '@shared/schema';

export async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    log('Skipping migrations: No DATABASE_URL found');
    return;
  }

  try {
    log('Running database migrations...');
    
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql, { schema });
    
    // Check if tables exist by trying to query
    try {
      await sql`SELECT 1 FROM projects LIMIT 1`;
      log('Database tables already exist');
    } catch (error) {
      // Tables don't exist, create them
      log('Creating database tables...');
      
      // Create all tables manually
      await sql`
        CREATE TABLE IF NOT EXISTS projects (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          technologies TEXT[] NOT NULL,
          live_url TEXT,
          github_url TEXT,
          image_url TEXT,
          featured TEXT NOT NULL DEFAULT 'false',
          "order" TEXT NOT NULL DEFAULT '0',
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS certificates (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          issuer TEXT NOT NULL,
          issue_date TEXT NOT NULL,
          credential_id TEXT,
          credential_url TEXT,
          skills TEXT[] NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS skills (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          level TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS services (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          icon TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS social_links (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          platform TEXT NOT NULL,
          url TEXT NOT NULL,
          icon TEXT NOT NULL,
          handle TEXT,
          "order" TEXT NOT NULL DEFAULT '0',
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          excerpt TEXT NOT NULL,
          content TEXT NOT NULL,
          tags TEXT[] NOT NULL,
          cover_image TEXT,
          published TEXT NOT NULL DEFAULT 'false',
          published_at TIMESTAMP,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      await sql`
        CREATE TABLE IF NOT EXISTS about_content (
          id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          subtitle TEXT NOT NULL,
          description TEXT NOT NULL,
          profile_image TEXT,
          stats TEXT[] NOT NULL,
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      
      log('✅ Database tables created successfully');
    }
    
    log('✅ Migrations completed');
  } catch (error) {
    log('❌ Migration error:', error instanceof Error ? error.message : 'Unknown error');
    // Don't throw - let app start even if migrations fail
  }
}

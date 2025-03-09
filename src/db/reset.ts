import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { dbConfig } from "./config";
import fs from "node:fs/promises";
import path from "node:path";

const pool = new Pool(dbConfig);
const db = drizzle(pool);

async function main() {
  console.log("Resetting database...");

  // Drop all schemas
  await pool.query(`
    DO $$ 
    DECLARE 
      schema_name text;
    BEGIN
      -- Get all non-system schemas
      FOR schema_name IN (
        SELECT nspname 
        FROM pg_namespace 
        WHERE nspname NOT LIKE 'pg_%' 
          AND nspname != 'information_schema'
      )
      LOOP
        EXECUTE 'DROP SCHEMA ' || quote_ident(schema_name) || ' CASCADE';
      END LOOP;
      
      -- Recreate public schema
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    END $$;
  `);

  console.log("All schemas dropped. Running migrations...");

  // Run migrations
  await migrate(db, { migrationsFolder: "src/db/migrations" });

  // Apply seed data if it exists
  try {
    const seedPath = path.join(process.cwd(), "src", "db", "seed.sql");
    const seedSQL = await fs.readFile(seedPath, "utf-8");
    if (seedSQL) {
      console.log("Applying seed data...");
      await pool.query(seedSQL);
      console.log("Seed data applied.");
    }
  } catch (err) {
    console.log("No seed data found, skipping...");
  }

  console.log("Database reset complete!");
  await pool.end();
}

main().catch((err) => {
  console.error("Database reset failed:", err);
  process.exit(1);
});

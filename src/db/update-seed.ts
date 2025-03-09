import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { dbConfig } from './config';
import { todos, tags, todoTags } from './migrations/schema';
import fs from 'node:fs/promises';
import path from 'node:path';

const pool = new Pool(dbConfig);
const db = drizzle(pool);

async function main() {
  console.log('Exporting current database data...');

  // Fetch all data
  const [allTags, allTodos, allTodoTags] = await Promise.all([
    db.select().from(tags),
    db.select().from(todos),
    db.select().from(todoTags),
  ]);

  // Create SQL insert statements
  const statements = [
    // Tags
    'TRUNCATE TABLE tags CASCADE;',
    ...allTags.map(tag => {
      return `INSERT INTO tags (id, name, created_at, updated_at) VALUES (
        '${tag.id}',
        '${tag.name}',
        '${tag.createdAt}',
        '${tag.updatedAt}'
      );`;
    }),

    // Todos
    'TRUNCATE TABLE todos CASCADE;',
    ...allTodos.map(todo => {
      return `INSERT INTO todos (id, title, completed, created_at, updated_at) VALUES (
        '${todo.id}',
        '${todo.title}',
        ${todo.completed},
        '${todo.createdAt}',
        '${todo.updatedAt}'
      );`;
    }),

    // Todo Tags
    'TRUNCATE TABLE todo_tags CASCADE;',
    ...allTodoTags.map(todoTag => {
      return `INSERT INTO todo_tags (todo_id, tag_id) VALUES (
        '${todoTag.todoId}',
        '${todoTag.tagId}'
      );`;
    }),
  ];

  // Write to seed file
  const seedPath = path.join(process.cwd(), 'src', 'db', 'seed.sql');
  await fs.writeFile(seedPath, statements.join('\n'));

  console.log('Seed file updated at src/db/seed.sql');
  await pool.end();
}

main().catch((err) => {
  console.error('Failed to update seed file:', err);
  process.exit(1);
}); 
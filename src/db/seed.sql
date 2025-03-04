TRUNCATE TABLE tags CASCADE;
TRUNCATE TABLE todos CASCADE;
INSERT INTO todos (id, title, completed, created_at, updated_at) VALUES (
        '28gbjx27k',
        'yooo',
        false,
        '2025-03-04 19:44:00.918105',
        '2025-03-04 19:44:00.918105'
      );
TRUNCATE TABLE todo_tags CASCADE;
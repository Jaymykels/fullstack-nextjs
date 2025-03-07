TRUNCATE TABLE tags CASCADE;
INSERT INTO tags (id, name, created_at, updated_at) VALUES (
        'c58ed63a-af24-4225-b978-94909d16a383',
        'Left',
        '2025-03-07 18:42:48.29897',
        '2025-03-07 18:42:48.29897'
      );
INSERT INTO tags (id, name, created_at, updated_at) VALUES (
        'bdd3de8d-0045-4456-98ef-ac8366c44e36',
        'Right',
        '2025-03-07 18:42:48.29897',
        '2025-03-07 18:42:48.29897'
      );
INSERT INTO tags (id, name, created_at, updated_at) VALUES (
        '8730efb6-2d29-4b98-b39a-ca22f929b295',
        'Up',
        '2025-03-07 19:07:29.803743',
        '2025-03-07 19:07:29.803743'
      );
TRUNCATE TABLE todos CASCADE;
INSERT INTO todos (id, title, completed, created_at, updated_at) VALUES (
        'bae9f783-e40e-4ca1-978d-aee7f7f7e857',
        'New Todo',
        false,
        '2025-03-07 18:42:48.29897',
        '2025-03-07 18:42:48.29897'
      );
INSERT INTO todos (id, title, completed, created_at, updated_at) VALUES (
        '25f2d125-b145-4d14-bc52-5878c6628692',
        'Another Todo',
        false,
        '2025-03-07 19:07:29.803743',
        '2025-03-07 19:07:29.803743'
      );
INSERT INTO todos (id, title, completed, created_at, updated_at) VALUES (
        '6f67e361-096a-4962-b432-8676a3c07fac',
        'Last Task',
        false,
        '2025-03-07 20:37:32.295228',
        '2025-03-07 20:37:32.295228'
      );
TRUNCATE TABLE todo_tags CASCADE;
INSERT INTO todo_tags (todo_id, tag_id) VALUES (
        'bae9f783-e40e-4ca1-978d-aee7f7f7e857',
        'c58ed63a-af24-4225-b978-94909d16a383'
      );
INSERT INTO todo_tags (todo_id, tag_id) VALUES (
        'bae9f783-e40e-4ca1-978d-aee7f7f7e857',
        'bdd3de8d-0045-4456-98ef-ac8366c44e36'
      );
INSERT INTO todo_tags (todo_id, tag_id) VALUES (
        '25f2d125-b145-4d14-bc52-5878c6628692',
        'c58ed63a-af24-4225-b978-94909d16a383'
      );
INSERT INTO todo_tags (todo_id, tag_id) VALUES (
        '25f2d125-b145-4d14-bc52-5878c6628692',
        '8730efb6-2d29-4b98-b39a-ca22f929b295'
      );
INSERT INTO todo_tags (todo_id, tag_id) VALUES (
        '6f67e361-096a-4962-b432-8676a3c07fac',
        '8730efb6-2d29-4b98-b39a-ca22f929b295'
      );
INSERT INTO todo_tags (todo_id, tag_id) VALUES (
        '6f67e361-096a-4962-b432-8676a3c07fac',
        'bdd3de8d-0045-4456-98ef-ac8366c44e36'
      );
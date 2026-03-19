UPDATE products
SET category = NULL
WHERE category IS NOT NULL AND btrim(category) = '';

UPDATE products
SET category = btrim(split_part(category, '/', 2))
WHERE category LIKE '%/%'
  AND btrim(split_part(category, '/', 2)) <> '';

UPDATE categories
SET parent_id = NULL;

INSERT INTO categories (name)
SELECT DISTINCT category
FROM products
WHERE category IS NOT NULL AND btrim(category) <> ''
ON CONFLICT DO NOTHING;

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS display_name text;

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS role text;

UPDATE profiles
SET role = 'staff'
WHERE role IS NULL;

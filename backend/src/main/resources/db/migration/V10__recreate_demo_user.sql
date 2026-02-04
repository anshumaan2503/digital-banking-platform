-- Remove the hardcoded demo user from V6
-- This allows DemoUserInitializer.java to recreate it with the correct BCrypt hash for 'demo@123'
DELETE FROM users WHERE username = 'demo';

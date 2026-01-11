-- Drop the old incorrectly named columns
ALTER TABLE accounts 
    DROP COLUMN balance,
    DROP COLUMN currency;

-- Add the correctly named columns
ALTER TABLE accounts
    ADD COLUMN balance_amount NUMERIC(19,2) NOT NULL DEFAULT 0,
    ADD COLUMN balance_currency VARCHAR(3) NOT NULL DEFAULT 'INR';

-- Add missing required columns
ALTER TABLE accounts
    ADD COLUMN user_id UUID NOT NULL DEFAULT gen_random_uuid(),
    ADD COLUMN type VARCHAR(50) NOT NULL DEFAULT 'SAVINGS';

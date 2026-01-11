-- Reset demo transactions to use updated data
DELETE FROM transactions WHERE account_number = 'DEMO_ACC_001' OR account_number = 'ACC001';

-- Update the demo account with new balance
UPDATE accounts
SET balance_amount = 247500.00
WHERE account_number IN ('DEMO_ACC_001', 'ACC001');

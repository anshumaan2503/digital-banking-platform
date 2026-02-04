-- Clean up existing demo data
DELETE FROM transactions WHERE account_number IN ('DEMO_ACC_001', 'ACC001');
DELETE FROM accounts WHERE account_number IN ('DEMO_ACC_001', 'ACC001');
DELETE FROM users WHERE username = 'demo';

-- Insert demo user with FIXED UUID
-- id: 8d7b6630-4380-675e-8b7b-66304380675e
INSERT INTO users (
    id,
    username,
    password,
    created_at,
    enabled
)
VALUES (
    '8d7b6630-4380-675e-8b7b-66304380675e',
    'demo',
    '$2a$10$Yp0n1Lxj0B1xkN2Yp9uM0e5p4Nn8KxZ0n5q5yG5T7QpJr4FQO8S4G', -- demo@123
    now(),
    true
);

-- Insert demo account linked to the FIXED UUID
INSERT INTO accounts (
    id,
    account_number,
    user_id,
    balance_amount,
    balance_currency,
    type,
    version,
    created_at,
    updated_at
)
VALUES (
    gen_random_uuid(),
    'DEMO_ACC_001',
    '8d7b6630-4380-675e-8b7b-66304380675e',
    247500.00,
    'INR',
    'SAVINGS',
    0,
    now(),
    now()
);

-- Insert a welcome transaction
INSERT INTO transactions (
    id,
    account_number,
    amount,
    currency,
    type,
    description,
    balance,
    created_at
)
VALUES (
    gen_random_uuid(),
    'DEMO_ACC_001',
    247500.00,
    'INR',
    'CREDIT',
    'Initial deposit for demo account',
    247500.00,
    now()
);

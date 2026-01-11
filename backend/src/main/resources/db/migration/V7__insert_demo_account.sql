-- DEMO ACCOUNT FOR DEMO USER (matches real schema)

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
SELECT
    gen_random_uuid(),
    'DEMO_ACC_001',
    u.id,
    247500.00,
    'INR',
    'SAVINGS',
    0,
    now(),
    now()
FROM users u
WHERE u.username = 'demo';

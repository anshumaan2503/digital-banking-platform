-- DEMO TRANSACTIONS (fully matches schema)

INSERT INTO transactions (
    id,
    account_number,
    type,
    amount,
    currency,
    timestamp,
    reference_id,
    created_at,
    description
)
VALUES
(
    gen_random_uuid(),
    'DEMO_ACC_001',
    'CREDIT',
    250000.00,
    'INR',
    now() - interval '30 days',
    gen_random_uuid(),
    now() - interval '30 days',
    'Salary credit - January 2026'
),
(
    gen_random_uuid(),
    'DEMO_ACC_001',
    'DEBIT',
    1200.00,
    'INR',
    now() - interval '12 days',
    gen_random_uuid(),
    now() - interval '12 days',
    'Amazon - Electronics purchase'
),
(
    gen_random_uuid(),
    'DEMO_ACC_001',
    'DEBIT',
    450.00,
    'INR',
    now() - interval '8 days',
    gen_random_uuid(),
    now() - interval '8 days',
    'Zomato - Food delivery'
),
(
    gen_random_uuid(),
    'DEMO_ACC_001',
    'DEBIT',
    850.00,
    'INR',
    now() - interval '5 days',
    gen_random_uuid(),
    now() - interval '5 days',
    'Netflix subscription renewal'
),
(
    gen_random_uuid(),
    'DEMO_ACC_001',
    'DEBIT',
    500.00,
    'INR',
    now() - interval '3 days',
    gen_random_uuid(),
    now() - interval '3 days',
    'Google Play - App purchase'
);

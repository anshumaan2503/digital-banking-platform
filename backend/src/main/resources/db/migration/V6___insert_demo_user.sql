-- DEMO USER (matches existing users table schema)

INSERT INTO users (
    id,
    username,
    password,
    created_at
)
VALUES (
    gen_random_uuid(),
    'demo',
    '$2a$10$Yp0n1Lxj0B1xkN2Yp9uM0e5p4Nn8KxZ0n5q5yG5T7QpJr4FQO8S4G',
    now()
);

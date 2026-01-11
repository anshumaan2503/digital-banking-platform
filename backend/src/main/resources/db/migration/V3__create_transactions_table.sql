CREATE TABLE transactions (
    id UUID PRIMARY KEY,
    account_number VARCHAR(32) NOT NULL,
    type VARCHAR(10) NOT NULL,
    amount NUMERIC(19,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    reference_id VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(500) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_tx_account ON transactions(account_number);
CREATE UNIQUE INDEX idx_tx_reference ON transactions(reference_id);

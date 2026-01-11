package com.fintech.digitalbanking.transaction.dto;

import com.fintech.digitalbanking.transaction.domain.Transaction;
import com.fintech.digitalbanking.transaction.domain.TransactionType;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public class TransactionResponse {

    private UUID id;
    private String accountNumber;
    private BigDecimal amount;
    private String currency;
    private TransactionType type;
    private String description;
    private OffsetDateTime createdAt;

    public TransactionResponse(
            UUID id,
            String accountNumber,
            BigDecimal amount,
            String currency,
            TransactionType type,
            String description,
            OffsetDateTime createdAt
    ) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.currency = currency;
        this.type = type;
        this.description = description;
        this.createdAt = createdAt;
    }

    /* ======================================================
       STATIC MAPPER (THIS FIXES YOUR RED LINE)
       ====================================================== */

    public static TransactionResponse from(Transaction transaction) {
        return new TransactionResponse(
                transaction.getId(),
                transaction.getAccountNumber(),
                transaction.getAmount(),
                transaction.getCurrency(),
                transaction.getType(),
                transaction.getDescription(),
                transaction.getCreatedAt()
        );
    }

    /* ========= GETTERS ========= */

    public UUID getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getCurrency() {
        return currency;
    }

    public TransactionType getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}

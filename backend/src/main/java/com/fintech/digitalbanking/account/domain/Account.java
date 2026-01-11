package com.fintech.digitalbanking.account.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String accountNumber;

    @Column(nullable = false)
    private UUID userId;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal balanceAmount;

    @Column(nullable = false, length = 3)
    private String balanceCurrency;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountType type;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @Version
    private Long version;

    /** JPA only */
    protected Account() {}

    public Account(UUID id, String accountNumber, UUID userId, AccountType type) {
        this.id = Objects.requireNonNull(id);
        this.accountNumber = Objects.requireNonNull(accountNumber);
        this.userId = Objects.requireNonNull(userId);
        this.type = Objects.requireNonNull(type);

        Money zero = Money.zero("INR");
        this.balanceAmount = zero.amount();
        this.balanceCurrency = zero.currency();
    }

    /* ========= Domain Behavior ========= */

    public void credit(Money amount) {
        validatePositive(amount);
        syncBalance(getBalance().add(amount));
    }

    public void debit(Money amount) {
        validatePositive(amount);

        Money current = getBalance();
        if (current.isLessThan(amount)) {
            throw new IllegalStateException("Insufficient balance");
        }

        syncBalance(current.subtract(amount));
    }

    /* ========= Internal Helpers ========= */

    private void validatePositive(Money amount) {
        if (amount.isNegativeOrZero()) {
            throw new IllegalArgumentException("Amount must be positive");
        }
    }

    private void syncBalance(Money money) {
        this.balanceAmount = money.amount();
        this.balanceCurrency = money.currency();
    }

    /* ========= Domain View ========= */

    @Transient
    public Money getBalance() {
        return new Money(balanceAmount, balanceCurrency);
    }

    /* ========= Getters ========= */

    public UUID getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public UUID getUserId() {
        return userId;
    }

    public AccountType getType() {
        return type;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Long getVersion() {
        return version;
    }
}

package com.fintech.digitalbanking.transaction.init;

import com.fintech.digitalbanking.account.domain.Account;
import com.fintech.digitalbanking.account.domain.Money;
import com.fintech.digitalbanking.account.repository.AccountRepository;
import com.fintech.digitalbanking.transaction.domain.Transaction;
import com.fintech.digitalbanking.transaction.domain.TransactionType;
import com.fintech.digitalbanking.transaction.repository.TransactionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Component
@Order(100) // Run after DemoAccountInitializer
public class DemoTransactionInitializer {

        private final AccountRepository accountRepository;
        private final TransactionRepository transactionRepository;

        public DemoTransactionInitializer(
                        AccountRepository accountRepository,
                        TransactionRepository transactionRepository) {
                this.accountRepository = accountRepository;
                this.transactionRepository = transactionRepository;
        }

        @PostConstruct
        public void init() {
                try {
                        // Find demo account
                        Account demoAccount = accountRepository.findByAccountNumber("ACC001").orElse(null);
                        if (demoAccount == null) {
                                System.out.println("⚠️ Demo account not found, skipping transaction creation");
                                return;
                        }

                        // Check if transactions already exist by counting
                        long transactionCount = transactionRepository.count();
                        if (transactionCount > 0) {
                                System.out.println("ℹ️ Transactions already exist, skipping demo data creation");
                                return;
                        }

                        // Get current time
                        OffsetDateTime now = OffsetDateTime.now();

                        // Create sample transactions (in chronological order)
                        Transaction[] transactions = {
                                        // Salary credit - 30 days ago
                                        new Transaction(
                                                        UUID.randomUUID(),
                                                        "ACC001",
                                                        new BigDecimal("250000.00"),
                                                        "INR",
                                                        TransactionType.CREDIT,
                                                        "Salary credit - January 2026",
                                                        now.minusDays(30)),
                                        // Amazon purchase - 12 days ago
                                        new Transaction(
                                                        UUID.randomUUID(),
                                                        "ACC001",
                                                        new BigDecimal("1200.00"),
                                                        "INR",
                                                        TransactionType.DEBIT,
                                                        "Amazon - Electronics purchase",
                                                        now.minusDays(12)),
                                        // Zomato food delivery - 8 days ago
                                        new Transaction(
                                                        UUID.randomUUID(),
                                                        "ACC001",
                                                        new BigDecimal("450.00"),
                                                        "INR",
                                                        TransactionType.DEBIT,
                                                        "Zomato - Food delivery",
                                                        now.minusDays(8)),
                                        // Netflix subscription - 5 days ago
                                        new Transaction(
                                                        UUID.randomUUID(),
                                                        "ACC001",
                                                        new BigDecimal("850.00"),
                                                        "INR",
                                                        TransactionType.DEBIT,
                                                        "Netflix subscription renewal",
                                                        now.minusDays(5)),
                                        // Google Play app purchase - 3 days ago
                                        new Transaction(
                                                        UUID.randomUUID(),
                                                        "ACC001",
                                                        new BigDecimal("500.00"),
                                                        "INR",
                                                        TransactionType.DEBIT,
                                                        "Google Play - App purchase",
                                                        now.minusDays(3))
                        };

                        // Save all transactions
                        for (Transaction transaction : transactions) {
                                transactionRepository.save(transaction);

                                // Update account balance based on transaction type
                                if (transaction.getType() == TransactionType.CREDIT) {
                                        demoAccount.credit(
                                                        new Money(transaction.getAmount(), transaction.getCurrency()));
                                } else {
                                        demoAccount.debit(
                                                        new Money(transaction.getAmount(), transaction.getCurrency()));
                                }
                        }

                        accountRepository.save(demoAccount);

                        System.out.println("✅ Demo transactions created: " + transactions.length + " transactions");
                        System.out.println("💰 Final balance: INR " + demoAccount.getBalance().amount());

                } catch (Exception ex) {
                        System.err.println("❌ Failed to create demo transactions: " + ex.getMessage());
                        ex.printStackTrace();
                }
        }
}

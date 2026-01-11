package com.fintech.digitalbanking.transaction.service;

import com.fintech.digitalbanking.account.domain.Account;
import com.fintech.digitalbanking.account.repository.AccountRepository;
import com.fintech.digitalbanking.auth.repository.UserRepository;
import com.fintech.digitalbanking.auth.security.SecurityUtils;
import com.fintech.digitalbanking.common.exception.ResourceNotFoundException;
import com.fintech.digitalbanking.transaction.domain.Transaction;
import com.fintech.digitalbanking.transaction.domain.TransactionType;
import com.fintech.digitalbanking.transaction.dto.TransactionResponse;
import com.fintech.digitalbanking.transaction.repository.TransactionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public TransactionService(
            TransactionRepository transactionRepository,
            AccountRepository accountRepository,
            UserRepository userRepository
    ) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    /* ======================================================
       INTERNAL: LOAD USER-OWNED ACCOUNT (NO SERVICE CYCLE)
       ====================================================== */

    private Account loadUserOwnedAccount(String accountNumber) {

        String username = SecurityUtils.getCurrentUsername();
        if (username == null) {
            throw new IllegalStateException("Unauthenticated request");
        }

        UUID userId = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new IllegalStateException("Authenticated user not found")
                )
                .getId();

        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Account not found: " + accountNumber
                        )
                );

        if (!account.getUserId().equals(userId)) {
            throw new SecurityException(
                    "Access denied to account: " + accountNumber
            );
        }

        return account;
    }

    /* ======================================================
       RECORD TRANSACTION (CALLED BY ACCOUNT SERVICE)
       ====================================================== */

    @Transactional
    public Transaction record(
            String accountNumber,
            BigDecimal amount,
            String currency,
            TransactionType type,
            String description
    ) {
        Transaction transaction = new Transaction(
                UUID.randomUUID(),
                accountNumber,
                amount,
                currency,
                type,
                description,
                OffsetDateTime.now()
        );

        return transactionRepository.save(transaction);
    }

    /* ======================================================
       SECURE TRANSACTION HISTORY
       ====================================================== */

    @Transactional(readOnly = true)
    public Page<TransactionResponse> getAccountTransactions(
            String accountNumber,
            Pageable pageable
    ) {
        Account account = loadUserOwnedAccount(accountNumber);

        return transactionRepository
                .findByAccountNumberOrderByCreatedAtDesc(
                        account.getAccountNumber(),
                        pageable
                )
                .map(TransactionResponse::from);
    }
}

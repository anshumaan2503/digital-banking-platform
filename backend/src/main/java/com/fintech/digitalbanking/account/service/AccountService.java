package com.fintech.digitalbanking.account.service;

import com.fintech.digitalbanking.account.domain.Account;
import com.fintech.digitalbanking.account.domain.AccountType;
import com.fintech.digitalbanking.account.domain.Money;
import com.fintech.digitalbanking.account.repository.AccountRepository;
import com.fintech.digitalbanking.auth.repository.UserRepository;
import com.fintech.digitalbanking.auth.security.SecurityUtils;
import com.fintech.digitalbanking.common.exception.ResourceNotFoundException;
import com.fintech.digitalbanking.transaction.domain.TransactionType;
import com.fintech.digitalbanking.transaction.service.TransactionService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final TransactionService transactionService;
    private final UserRepository userRepository;

    public AccountService(
            AccountRepository accountRepository,
            TransactionService transactionService,
            UserRepository userRepository
    ) {
        this.accountRepository = accountRepository;
        this.transactionService = transactionService;
        this.userRepository = userRepository;
    }

    /* ======================================================
       INTERNAL HELPER — SINGLE OWNERSHIP GATEKEEPER
       ====================================================== */

    private Account loadUserOwnedAccount(String accountNumber) {

        // 1️⃣ Get authenticated username
        String username = SecurityUtils.getCurrentUsername();
        if (username == null) {
            throw new IllegalStateException("Unauthenticated request");
        }

        // 2️⃣ Resolve userId
        UUID userId = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new IllegalStateException("Authenticated user not found")
                )
                .getId();

        // 3️⃣ Load account (404 if not found)
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Account not found: " + accountNumber
                        )
                );

        // 4️⃣ Enforce ownership (403 later)
        if (!account.getUserId().equals(userId)) {
            throw new SecurityException(
                    "Access denied to account: " + accountNumber
            );
        }

        return account;
    }

    /* ========= READ ========= */

    @Transactional
    public Account getAccount(String accountNumber) {
        return loadUserOwnedAccount(accountNumber);
    }

    /* ========= CREDIT ========= */

    @Transactional
    public void credit(
            String accountNumber,
            Money amount,
            String description
    ) {
        Account account = loadUserOwnedAccount(accountNumber);

        account.credit(amount);
        accountRepository.save(account);

        transactionService.record(
                accountNumber,
                amount.amount(),
                amount.currency(),
                TransactionType.CREDIT,
                description
        );
    }

    /* ========= DEBIT ========= */

    @Transactional
    public void debit(
            String accountNumber,
            Money amount,
            String description
    ) {
        Account account = loadUserOwnedAccount(accountNumber);

        account.debit(amount);
        accountRepository.save(account);

        transactionService.record(
                accountNumber,
                amount.amount(),
                amount.currency(),
                TransactionType.DEBIT,
                description
        );
    }

    /* ========= CREATE ACCOUNT ========= */

    @Transactional
    public void createAccount(String accountNumber, String type) {

        String username = SecurityUtils.getCurrentUsername();
        if (username == null) {
            throw new IllegalStateException("Unauthenticated request");
        }

        UUID userId = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new IllegalStateException("Authenticated user not found")
                )
                .getId();

        try {
            Account account = new Account(
                    UUID.randomUUID(),
                    accountNumber,
                    userId,
                    AccountType.valueOf(type)
            );
            accountRepository.save(account);
        } catch (org.springframework.dao.DataIntegrityViolationException ex) {
            throw new IllegalStateException(
                    "Account already exists with number: " + accountNumber
            );
        }
    }
}

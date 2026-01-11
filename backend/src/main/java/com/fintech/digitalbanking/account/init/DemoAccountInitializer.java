package com.fintech.digitalbanking.account.init;

import com.fintech.digitalbanking.account.domain.Account;
import com.fintech.digitalbanking.account.domain.AccountType;
import com.fintech.digitalbanking.account.repository.AccountRepository;
import com.fintech.digitalbanking.auth.domain.UserEntity;
import com.fintech.digitalbanking.auth.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class DemoAccountInitializer {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public DemoAccountInitializer(
            AccountRepository accountRepository,
            UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void init() {
        try {
            // Find demo user
            UserEntity demoUser = userRepository.findByUsername("demo").orElse(null);
            if (demoUser == null) {
                System.out.println("⚠️ Demo user not found, skipping account creation");
                return;
            }

            // Check if demo user already has an account
            if (!accountRepository.findByUserId(demoUser.getId()).isEmpty()) {
                System.out.println("ℹ️ Demo account already exists");
                return;
            }

            // Create demo account
            Account demoAccount = new Account(
                    UUID.randomUUID(),
                    "ACC001",
                    demoUser.getId(),
                    AccountType.SAVINGS);

            accountRepository.save(demoAccount);
            System.out.println("✅ Demo account created: ACC001");

        } catch (Exception ex) {
            System.err.println("❌ Failed to create demo account: " + ex.getMessage());
        }
    }
}

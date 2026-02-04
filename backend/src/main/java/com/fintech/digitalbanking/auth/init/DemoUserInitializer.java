package com.fintech.digitalbanking.auth.init;

import com.fintech.digitalbanking.auth.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class DemoUserInitializer {

    private final UserService userService;

    public DemoUserInitializer(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void init() {
        try {
            userService.setupDemoUser("demo", "demo@123");
            System.out.println("✅ Demo user synchronized");
        } catch (Exception ex) {
            System.err.println("❌ Failed to initialize demo user: " + ex.getMessage());
        }
    }
}

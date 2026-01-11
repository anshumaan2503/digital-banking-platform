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
            userService.createUser("demo", "demo@123");
            System.out.println("✅ Demo user created");
        } catch (IllegalArgumentException ex) {
            System.out.println("ℹ️ Demo user already exists");
        }
    }
}

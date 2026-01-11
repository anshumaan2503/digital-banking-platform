package com.fintech.digitalbanking.auth.bootstrap;

import com.fintech.digitalbanking.auth.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserDataInitializer {

    @Bean
    CommandLineRunner initUsers(UserService userService) {
        return args -> {
            try {
                userService.createUser("testuser", "password");
            } catch (IllegalArgumentException ignored) {
                // user already exists
            }
        };
    }
}

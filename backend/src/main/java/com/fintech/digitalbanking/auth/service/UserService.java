package com.fintech.digitalbanking.auth.service;

import com.fintech.digitalbanking.auth.domain.UserEntity;
import com.fintech.digitalbanking.auth.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserEntity setupDemoUser(String username, String rawPassword) {
        return userRepository.findByUsername(username)
                .map(existing -> {
                    // Update password to ensure it matches the expected demo credentials
                    UserEntity updated = new UserEntity(
                            existing.getId(),
                            existing.getUsername(),
                            passwordEncoder.encode(rawPassword));
                    return userRepository.save(updated);
                })
                .orElseGet(() -> createUser(username, rawPassword));
    }

    public UserEntity createUser(String username, String rawPassword) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists");
        }

        UserEntity user = new UserEntity(
                UUID.randomUUID(),
                username,
                passwordEncoder.encode(rawPassword));

        return userRepository.save(user);
    }
}

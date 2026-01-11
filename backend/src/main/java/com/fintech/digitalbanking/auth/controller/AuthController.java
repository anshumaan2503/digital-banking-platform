package com.fintech.digitalbanking.auth.controller;

import com.fintech.digitalbanking.account.domain.Account;
import com.fintech.digitalbanking.account.repository.AccountRepository;
import com.fintech.digitalbanking.auth.domain.UserEntity;
import com.fintech.digitalbanking.auth.dto.LoginRequest;
import com.fintech.digitalbanking.auth.dto.LoginResponse;
import com.fintech.digitalbanking.auth.jwt.JwtUtil;
import com.fintech.digitalbanking.auth.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            UserRepository userRepository,
            AccountRepository accountRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(),
                                    request.getPassword()
                            )
                    );

            String username = authentication.getName();
            String token = jwtUtil.generateToken(username);

            String accountNumber = "";
            UserEntity user = userRepository.findByUsername(username).orElse(null);

            if (user != null) {
                List<Account> accounts =
                        accountRepository.findByUserId(user.getId());
                if (!accounts.isEmpty()) {
                    accountNumber = accounts.get(0).getAccountNumber();
                }
            }

            return ResponseEntity.ok(
                    new LoginResponse(token, username, accountNumber)
            );

        } catch (BadCredentialsException ex) {
            // ✅ Correct behavior
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }
}

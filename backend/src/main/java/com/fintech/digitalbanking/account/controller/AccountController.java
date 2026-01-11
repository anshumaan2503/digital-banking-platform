package com.fintech.digitalbanking.account.controller;

import com.fintech.digitalbanking.account.domain.Account;
import com.fintech.digitalbanking.account.domain.Money;
import com.fintech.digitalbanking.account.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

        private final AccountService accountService;

        public AccountController(AccountService accountService) {
                this.accountService = accountService;
        }

        /*
         * ======================================================
         * GET ACCOUNT
         * ======================================================
         */

        @GetMapping("/{accountNumber}")
        public ResponseEntity<Account> getAccount(
                        @PathVariable String accountNumber) {
                return ResponseEntity.ok(
                                accountService.getAccount(accountNumber));
        }

        /*
         * ======================================================
         * CREDIT
         * ======================================================
         */

        @PostMapping("/{accountNumber}/credit")
        public ResponseEntity<Void> credit(
                        @PathVariable String accountNumber,
                        @RequestBody Money amount,
                        @RequestParam(required = false) String description) {
                accountService.credit(
                                accountNumber,
                                amount,
                                description);
                return ResponseEntity.ok().build();
        }

        /*
         * ======================================================
         * DEBIT
         * ======================================================
         */

        @PostMapping("/{accountNumber}/debit")
        public ResponseEntity<Void> debit(
                        @PathVariable String accountNumber,
                        @RequestBody Money amount,
                        @RequestParam(required = false) String description) {
                accountService.debit(
                                accountNumber,
                                amount,
                                description);
                return ResponseEntity.ok().build();
        }
}

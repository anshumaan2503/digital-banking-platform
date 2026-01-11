package com.fintech.digitalbanking.transaction.controller;

import com.fintech.digitalbanking.transaction.dto.TransactionResponse;
import com.fintech.digitalbanking.transaction.service.TransactionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts/{accountNumber}/transactions")
public class TransactionController {

        private final TransactionService transactionService;

        public TransactionController(TransactionService transactionService) {
                this.transactionService = transactionService;
        }

        /*
         * ======================================================
         * GET TRANSACTION HISTORY (PAGINATED)
         * ======================================================
         */

        @GetMapping
        public ResponseEntity<Page<TransactionResponse>> getTransactions(
                        @PathVariable String accountNumber,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) {
                Pageable pageable = PageRequest.of(
                                page,
                                size,
                                Sort.by(Sort.Direction.DESC, "createdAt"));

                Page<TransactionResponse> transactions = transactionService.getAccountTransactions(
                                accountNumber,
                                pageable);

                return ResponseEntity.ok(transactions);
        }
}

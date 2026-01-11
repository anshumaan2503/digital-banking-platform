package com.fintech.digitalbanking.transaction.repository;

import com.fintech.digitalbanking.transaction.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.UUID;

public interface TransactionRepository
        extends JpaRepository<Transaction, UUID> {

    Page<Transaction> findByAccountNumberOrderByCreatedAtDesc(
            String accountNumber,
            Pageable pageable
    );


}

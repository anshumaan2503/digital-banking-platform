package com.fintech.digitalbanking.account.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class CreateAccountRequest {

    @NotBlank
    private String accountNumber;

    @NotBlank
    private String type;

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getType() {
        return type;
    }
}


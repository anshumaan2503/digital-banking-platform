package com.fintech.digitalbanking.auth.dto;

public class LoginResponse {

    private String token;
    private String username;
    private String accountNumber;

    public LoginResponse(String token, String username, String accountNumber) {
        this.token = token;
        this.username = username;
        this.accountNumber = accountNumber;
    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public String getAccountNumber() {
        return accountNumber;
    }
}

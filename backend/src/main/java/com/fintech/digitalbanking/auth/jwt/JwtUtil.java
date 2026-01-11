package com.fintech.digitalbanking.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    // ⚠️ In production, load this from env / config
    private static final SecretKey SECRET_KEY =
            Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private static final long EXPIRATION_MILLIS = 1000 * 60 * 60; // 1 hour

    /* ======================================================
       GENERATE TOKEN
       ====================================================== */

    public String generateToken(String username) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + EXPIRATION_MILLIS);

        return Jwts.builder()
                .subject(username)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(SECRET_KEY)
                .compact();
    }

    /* ======================================================
       VALIDATE TOKEN
       ====================================================== */

    public boolean isTokenValid(String token) {
        try {
            getAllClaims(token);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    /* ======================================================
       EXTRACT USERNAME
       ====================================================== */

    public String extractUsername(String token) {
        return getAllClaims(token).getSubject();
    }

    /* ======================================================
       INTERNAL
       ====================================================== */

    private Claims getAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}

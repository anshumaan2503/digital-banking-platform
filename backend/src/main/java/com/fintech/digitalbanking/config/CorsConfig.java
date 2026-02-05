package com.fintech.digitalbanking.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration config = new CorsConfiguration();

                String allowedOrigins = System.getenv("ALLOWED_ORIGINS");
                if (allowedOrigins != null && !allowedOrigins.isEmpty()) {
                        config.setAllowedOrigins(List.of(allowedOrigins.split(",")));
                } else {
                        config.setAllowedOrigins(List.of(
                                        "http://localhost:3000",
                                        "https://digital-banking-platform.onrender.com"));
                }

                config.setAllowedMethods(List.of(
                                "GET", "POST", "PUT", "DELETE", "OPTIONS"));

                config.setAllowedHeaders(List.of(
                                "Authorization",
                                "Content-Type"));

                config.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", config);

                return source;
        }
}

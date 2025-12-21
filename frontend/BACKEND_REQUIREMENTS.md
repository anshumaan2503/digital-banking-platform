# Spring Boot Backend API Requirements

## Required Endpoints

### 1. Authentication
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt-token-here",
  "accountNumber": "1234567890"
}
```

### 2. Account Information
```
GET /api/accounts/{accountNumber}
Authorization: Bearer {jwt-token}

Response:
{
  "accountNumber": "1234567890",
  "balance": 5000.00,
  "currency": "USD",
  "accountType": "SAVINGS"
}
```

### 3. Transaction History
```
GET /api/accounts/{accountNumber}/transactions?page=0&size=10
Authorization: Bearer {jwt-token}

Response:
{
  "content": [
    {
      "id": "txn-123",
      "type": "CREDIT",
      "amount": 1000.00,
      "currency": "USD",
      "description": "Salary deposit",
      "timestamp": "2024-01-15T10:30:00Z",
      "balance": 5000.00
    }
  ],
  "totalElements": 50,
  "totalPages": 5,
  "size": 10,
  "number": 0
}
```

### 4. Transfer Money (Debit)
```
POST /api/accounts/{accountNumber}/debit
Authorization: Bearer {jwt-token}
Content-Type: application/json

Request Body:
{
  "toAccountNumber": "9876543210",
  "amount": 500.00,
  "currency": "USD",
  "description": "Transfer to friend"
}

Response:
{
  "id": "txn-124",
  "type": "DEBIT",
  "amount": 500.00,
  "currency": "USD",
  "description": "Transfer to friend",
  "timestamp": "2024-01-15T11:00:00Z",
  "balance": 4500.00
}
```

### 5. Receive Money (Credit) - Optional
```
POST /api/accounts/{accountNumber}/credit
Authorization: Bearer {jwt-token}
Content-Type: application/json

Request Body:
{
  "toAccountNumber": "1234567890",
  "amount": 200.00,
  "currency": "USD",
  "description": "Payment received"
}

Response:
{
  "id": "txn-125",
  "type": "CREDIT",
  "amount": 200.00,
  "currency": "USD",
  "description": "Payment received",
  "timestamp": "2024-01-15T11:30:00Z",
  "balance": 4700.00
}
```

## CORS Configuration

Add this to your Spring Boot application:

```java
@Configuration
@EnableWebSecurity
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") // Frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## JWT Security Configuration

```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            // Validate JWT token and set authentication
        }
        
        filterChain.doFilter(request, response);
    }
}
```

## Error Handling

Return appropriate HTTP status codes:
- 200: Success
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid/expired token)
- 404: Not Found (account not found)
- 500: Internal Server Error
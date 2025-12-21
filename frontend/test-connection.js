// Test script to verify backend connection
// Run with: node test-connection.js

const API_BASE_URL = 'http://localhost:8080/api';

async function testConnection() {
  console.log('Testing connection to Spring Boot backend...');
  console.log('API Base URL:', API_BASE_URL);
  
  try {
    // Test login endpoint
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    console.log('Login endpoint status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend connection successful!');
      console.log('Response:', data);
    } else {
      console.log('❌ Backend returned error:', response.status);
      const errorText = await response.text();
      console.log('Error details:', errorText);
    }
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('Make sure your Spring Boot backend is running on port 8080');
  }
}

testConnection();
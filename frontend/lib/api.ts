export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;


export interface Account {
  accountNumber: string
  balance: number
  currency: string
  accountType: string
}

export interface Transaction {
  id: string
  type: 'CREDIT' | 'DEBIT'
  amount: number
  currency: string
  description: string
  timestamp: string
  balance: number
}

export interface TransactionResponse {
  content: Transaction[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

export interface TransferRequest {
  toAccountNumber: string
  amount: number
  currency: string
  description?: string
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('authToken')
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    const errorText = await response.text()
    throw new ApiError(response.status, errorText || 'An error occurred')
  }

  return response.json()
}

export const api = {
  // Auth
  login: async (username: string, password: string): Promise<{ token: string; accountNumber: string }> => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  },

  // Account
  getAccount: async (accountNumber: string): Promise<Account> => {
    return apiRequest(`/accounts/${accountNumber}`)
  },

  // Transactions
  getTransactions: async (
    accountNumber: string,
    page: number = 0,
    size: number = 10
  ): Promise<TransactionResponse> => {
    return apiRequest(`/accounts/${accountNumber}/transactions?page=${page}&size=${size}`)
  },

  // Transfer
  credit: async (accountNumber: string, request: TransferRequest): Promise<Transaction> => {
    return apiRequest(`/accounts/${accountNumber}/credit`, {
      method: 'POST',
      body: JSON.stringify(request),
    })
  },

  debit: async (accountNumber: string, request: TransferRequest): Promise<Transaction> => {
    return apiRequest(`/accounts/${accountNumber}/debit`, {
      method: 'POST',
      body: JSON.stringify(request),
    })
  },
}
"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { api, Account, Transaction } from '@/lib/api'
import { formatCurrency, formatAccountNumber } from '@/lib/utils'
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft, Loader2 } from 'lucide-react'

export default function DashboardPage() {
  const [account, setAccount] = useState<Account | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const accountNumber = localStorage.getItem('accountNumber')
        const token = localStorage.getItem('authToken')
        
        if (!accountNumber || !token) {
          router.push('/')
          return
        }

        const [accountData, transactionsData] = await Promise.all([
          api.getAccount(accountNumber),
          api.getTransactions(accountNumber, 0, 5)
        ])

        setAccount(accountData)
        setTransactions(transactionsData.content)
      } catch (err: any) {
        if (err.status === 401) {
          router.push('/')
        } else {
          setError(err.message || 'Failed to load dashboard data')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [router])

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-1">Here's your account overview</p>
        </div>

        {/* Account Summary Card */}
        {account && (
          <Card className="bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 border-0 text-white shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-6 w-6" />
                  <CardTitle className="text-lg font-medium text-indigo-100">
                    {account.accountType} Account
                  </CardTitle>
                </div>
                <TrendingUp className="h-5 w-5 text-indigo-200" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-indigo-200 text-sm font-medium">Account Number</p>
                <p className="text-xl font-mono font-semibold">
                  {formatAccountNumber(account.accountNumber)}
                </p>
              </div>
              <div>
                <p className="text-indigo-200 text-sm font-medium">Available Balance</p>
                <p className="text-4xl font-bold">
                  {formatCurrency(account.balance, account.currency)}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Transactions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No recent transactions
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'CREDIT' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-rose-100 text-rose-600'
                      }`}>
                        {transaction.type === 'CREDIT' ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Badge variant={transaction.type === 'CREDIT' ? 'success' : 'error'}>
                          {transaction.type}
                        </Badge>
                        <p className={`font-semibold ${
                          transaction.type === 'CREDIT' ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {transaction.type === 'CREDIT' ? '+' : '-'}
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Balance: {formatCurrency(transaction.balance, transaction.currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
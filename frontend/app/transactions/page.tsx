"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { api, Transaction, TransactionResponse } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'
import { ArrowUpRight, ArrowDownLeft, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 1,
    totalElements: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const accountNumber = localStorage.getItem('accountNumber')
        const token = localStorage.getItem('authToken')
        
        if (!accountNumber || !token) {
          router.push('/')
          return
        }

        const response: TransactionResponse = await api.getTransactions(accountNumber, 0, 10)
        
        setTransactions(response.content)
        setPagination({
          page: response.number,
          size: response.size,
          totalPages: response.totalPages,
          totalElements: response.totalElements
        })
      } catch (err: any) {
        if (err.status === 401) {
          router.push('/')
        } else {
          setError(err.message || 'Failed to load transactions')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTransactions()
  }, [router])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }))
    }
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
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600 mt-1">View all your account transactions</p>
        </div>

        {/* Transactions Table */}
        <Card className="shadow-lg bg-gradient-to-br from-white to-indigo-50/30">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
            <CardTitle className="text-xl font-semibold">
              All Transactions ({pagination.totalElements})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Balance</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.map((transaction, index) => (
                        <tr 
                          key={transaction.id} 
                          className={`hover:bg-gray-50 transition-colors ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
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
                              <Badge variant={transaction.type === 'CREDIT' ? 'success' : 'error'}>
                                {transaction.type}
                              </Badge>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{transaction.description}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className={`font-semibold ${
                              transaction.type === 'CREDIT' ? 'text-emerald-600' : 'text-rose-600'
                            }`}>
                              {transaction.type === 'CREDIT' ? '+' : '-'}
                              {formatCurrency(transaction.amount, transaction.currency)}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">
                              {formatCurrency(transaction.balance, transaction.currency)}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-gray-600">
                              {new Date(transaction.timestamp).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(transaction.timestamp).toLocaleTimeString()}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4 p-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
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
                          <Badge variant={transaction.type === 'CREDIT' ? 'success' : 'error'}>
                            {transaction.type}
                          </Badge>
                        </div>
                        <p className={`font-semibold ${
                          transaction.type === 'CREDIT' ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {transaction.type === 'CREDIT' ? '+' : '-'}
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900 mb-2">{transaction.description}</p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Balance: {formatCurrency(transaction.balance, transaction.currency)}</span>
                        <span>{new Date(transaction.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
                    <div className="text-sm text-gray-700">
                      Showing {pagination.page * pagination.size + 1} to{' '}
                      {Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)} of{' '}
                      {pagination.totalElements} transactions
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <span className="text-sm text-gray-700">
                        Page {pagination.page + 1} of {pagination.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages - 1}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
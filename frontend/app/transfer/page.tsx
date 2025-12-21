"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { api, Account } from '@/lib/api'
import { formatCurrency, formatAccountNumber } from '@/lib/utils'
import { ArrowRight, Loader2, Send, Wallet } from 'lucide-react'

export default function TransferPage() {
  const [account, setAccount] = useState<Account | null>(null)
  const [toAccountNumber, setToAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAccount, setIsLoadingAccount] = useState(true)
  const router = useRouter()
  const { addToast } = useToast()

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const accountNumber = localStorage.getItem('accountNumber')
        const token = localStorage.getItem('authToken')
        
        if (!accountNumber || !token) {
          router.push('/')
          return
        }

        const accountData = await api.getAccount(accountNumber)
        setAccount(accountData)
      } catch (err: any) {
        if (err.status === 401) {
          router.push('/')
        } else {
          addToast({
            title: 'Error',
            description: 'Failed to load account information',
            variant: 'destructive'
          })
        }
      } finally {
        setIsLoadingAccount(false)
      }
    }

    loadAccount()
  }, [router, addToast])

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!account) return

    const transferAmount = parseFloat(amount)
    if (transferAmount <= 0) {
      addToast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount greater than 0',
        variant: 'destructive'
      })
      return
    }

    if (transferAmount > account.balance) {
      addToast({
        title: 'Insufficient Funds',
        description: 'You do not have enough balance for this transfer',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)

    try {
      await api.debit(account.accountNumber, {
        toAccountNumber,
        amount: transferAmount,
        currency: account.currency,
        description: description || `Transfer to ${toAccountNumber}`
      })

      addToast({
        title: 'Transfer Successful',
        description: `Successfully transferred ${formatCurrency(transferAmount, account.currency)} to ${toAccountNumber}`,
        variant: 'success'
      })

      // Reset form
      setToAccountNumber('')
      setAmount('')
      setDescription('')

      // Refresh account data
      const updatedAccount = await api.getAccount(account.accountNumber)
      setAccount(updatedAccount)

    } catch (err: any) {
      addToast({
        title: 'Transfer Failed',
        description: err.message || 'Failed to process transfer',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingAccount) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Transfer Money</h1>
          <p className="text-gray-600 mt-1">Send money to another account</p>
        </div>

        {/* From Account Card */}
        {account && (
          <Card className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Wallet className="h-5 w-5" />
                <span>From Account</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-teal-100">Account Number</span>
                <span className="font-mono font-semibold">
                  {formatAccountNumber(account.accountNumber)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-teal-100">Available Balance</span>
                <span className="text-2xl font-bold">
                  {formatCurrency(account.balance, account.currency)}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transfer Form */}
        <Card className="shadow-xl bg-gradient-to-br from-white to-indigo-50/30">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center space-x-2 text-xl">
              <Send className="h-5 w-5" />
              <span>Transfer Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleTransfer} className="space-y-6">
              {/* To Account */}
              <div className="space-y-2">
                <label htmlFor="toAccount" className="text-sm font-semibold text-gray-700">
                  To Account Number
                </label>
                <Input
                  id="toAccount"
                  type="text"
                  placeholder="Enter recipient account number"
                  value={toAccountNumber}
                  onChange={(e) => setToAccountNumber(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-semibold text-gray-700">
                  Amount ({account?.currency})
                </label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={account?.balance}
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="h-12 text-base pl-8"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₹
                  </span>
                </div>
                {account && (
                  <p className="text-sm text-gray-600">
                    Maximum: {formatCurrency(account.balance, account.currency)}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-semibold text-gray-700">
                  Description (Optional)
                </label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Enter transfer description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              {/* Transfer Summary */}
              {amount && parseFloat(amount) > 0 && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Transfer Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transfer Amount</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(parseFloat(amount), account?.currency || 'INR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To Account</span>
                      <span className="font-mono font-semibold text-gray-900">
                        {toAccountNumber || 'Not specified'}
                      </span>
                    </div>
                    {account && (
                      <div className="flex justify-between pt-2 border-t border-indigo-200">
                        <span className="text-gray-600">Remaining Balance</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(account.balance - parseFloat(amount), account.currency)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !toAccountNumber || !amount || parseFloat(amount) <= 0}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Transfer...
                  </>
                ) : (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Transfer Money
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Security Notice</p>
                <p>
                  Please verify the recipient account number carefully before confirming the transfer. 
                  Transfers cannot be reversed once processed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
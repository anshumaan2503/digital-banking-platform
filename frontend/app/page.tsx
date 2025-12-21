"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SignInModal } from '@/components/auth/sign-in-modal'
import { 
  CreditCard, 
  LayoutDashboard, 
  ArrowLeftRight, 
  Receipt, 
  Shield, 
  Zap, 
  Globe,
  TrendingUp,
  Users,
  Lock
} from 'lucide-react'

export default function HomePage() {
  const [showSignInModal, setShowSignInModal] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Digital Banking Platform
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="hidden sm:inline-flex"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </Button>
              <Button 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                onClick={() => setShowSignInModal(true)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl mb-8 shadow-2xl">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Modern Banking
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of digital banking with our secure, fast, and intuitive platform. 
              Manage your finances with confidence and style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-lg px-8 py-4 h-auto"
                onClick={() => setShowSignInModal(true)}
              >
                <LayoutDashboard className="mr-2 h-5 w-5" />
                View Dashboard
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 h-auto border-2 hover:bg-indigo-50"
                onClick={() => setShowSignInModal(true)}
              >
                <Receipt className="mr-2 h-5 w-5" />
                View Transactions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access</h2>
            <p className="text-gray-600">Jump straight to what you need</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Dashboard Card */}
            <div onClick={() => setShowSignInModal(true)}>
              <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-indigo-500 to-purple-600 text-white transform hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <LayoutDashboard className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl">Dashboard</CardTitle>
                  <CardDescription className="text-indigo-100">
                    View your account overview and recent activity
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-sm text-indigo-100">
                    Account balance, recent transactions, and more
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transactions Card */}
            <div onClick={() => setShowSignInModal(true)}>
              <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-teal-500 to-cyan-600 text-white transform hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <Receipt className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl">Transactions</CardTitle>
                  <CardDescription className="text-teal-100">
                    Complete history of all your transactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-sm text-teal-100">
                    Search, filter, and export transaction data
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transfer Card */}
            <div onClick={() => setShowSignInModal(true)}>
              <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white transform hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <ArrowLeftRight className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl">Transfer Money</CardTitle>
                  <CardDescription className="text-emerald-100">
                    Send money quickly and securely
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-sm text-emerald-100">
                    Instant transfers with real-time notifications
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600">Built for the modern digital lifestyle</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-gray-600 text-sm">256-bit encryption and multi-factor authentication</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">Instant transactions and real-time updates</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Access</h3>
              <p className="text-gray-600 text-sm">Access your account from anywhere in the world</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Insights</h3>
              <p className="text-gray-600 text-sm">AI-powered spending analysis and recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Trusted by Millions</h2>
              <p className="text-indigo-100">Join the digital banking revolution</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">2M+</div>
                <div className="text-indigo-100">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">₹50B+</div>
                <div className="text-indigo-100">Transactions Processed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-indigo-100">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Digital Banking Platform</span>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setShowSignInModal(true)}
                className="hover:text-indigo-400 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => setShowSignInModal(true)}
                className="hover:text-indigo-400 transition-colors"
              >
                Transactions
              </button>
              <button 
                onClick={() => setShowSignInModal(true)}
                className="hover:text-indigo-400 transition-colors"
              >
                Transfer
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Digital Banking Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sign In Modal */}
      <SignInModal 
        open={showSignInModal} 
        onOpenChange={setShowSignInModal} 
      />
    </div>
  )
}

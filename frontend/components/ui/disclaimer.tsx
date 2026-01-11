"use client"

import { AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function Disclaimer() {
  return (
    <Card className="border-amber-200 bg-amber-50 shadow-sm">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-semibold text-amber-900">Demo Account Notice</h3>
            <p className="text-sm text-amber-800">
              This is a <strong>demonstration account</strong> with sample data for testing purposes. 
              All transactions and balances shown here are fictional and for UI/UX preview only. 
              In production, ensure proper security measures and data validation are in place.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

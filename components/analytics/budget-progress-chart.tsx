"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface BudgetProgressChartProps {
  budgets: Array<{
    category: string
    icon: string
    color: string
    spent: number
    budget: number
    percentage: number
  }>
}

export function BudgetProgressChart({ budgets }: BudgetProgressChartProps) {
  const getStatusIcon = (percentage: number) => {
    if (percentage >= 100) return <AlertTriangle className="w-4 h-4 text-red-500" />
    if (percentage >= 80) return <TrendingUp className="w-4 h-4 text-yellow-500" />
    if (percentage >= 50) return <TrendingUp className="w-4 h-4 text-blue-500" />
    return <CheckCircle className="w-4 h-4 text-green-500" />
  }

  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return "bg-red-500"
    if (percentage >= 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budget, 0)
  const overallPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
        <CardDescription>
          Overall: ₹{totalSpent.toLocaleString()} of ₹{totalBudget.toLocaleString()} ({overallPercentage.toFixed(1)}%)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Progress */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Overall Budget</span>
              <span className="text-sm text-gray-500">{overallPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={Math.min(overallPercentage, 100)} className="h-3" />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>₹{totalSpent.toLocaleString()}</span>
              <span>₹{totalBudget.toLocaleString()}</span>
            </div>
          </div>

          {/* Category Budgets */}
          <div className="space-y-4">
            {budgets.map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{budget.icon}</span>
                    <span className="font-medium">{budget.category}</span>
                    {getStatusIcon(budget.percentage)}
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      ₹{budget.spent.toLocaleString()} / ₹{budget.budget.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">{budget.percentage.toFixed(1)}%</div>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={Math.min(budget.percentage, 100)} className="h-2" />
                  {budget.percentage > 100 && (
                    <div
                      className="absolute top-0 left-0 h-2 bg-red-500 rounded-full opacity-20"
                      style={{ width: "100%" }}
                    />
                  )}
                </div>
                {budget.percentage > 100 && (
                  <p className="text-xs text-red-500">
                    Over budget by ₹{(budget.spent - budget.budget).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

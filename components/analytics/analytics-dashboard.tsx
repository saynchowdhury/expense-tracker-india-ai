"use client"

import { useState } from "react"
import { AnalyticsFilters } from "./analytics-filters"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Target, Calendar, PieChart } from "lucide-react"

// Empty data - no dummy data as requested
const emptySpendingTrends: any[] = []
const emptyCategoryData: any[] = []
const emptyDailyData: any[] = []
const emptyBudgetData: any[] = []

export function AnalyticsDashboard() {
  const [spendingTrends, setSpendingTrends] = useState(emptySpendingTrends)
  const [categoryData, setCategoryData] = useState(emptyCategoryData)
  const [dailyData, setDailyData] = useState(emptyDailyData)
  const [budgetData, setBudgetData] = useState(emptyBudgetData)

  const handleDateRangeChange = (range: { from: string; to: string }) => {
    console.log("Date range changed:", range)
    // In a real app, fetch new data based on date range
  }

  const handleCategoryFilter = (categories: string[]) => {
    console.log("Categories filtered:", categories)
    // In a real app, filter data based on selected categories
  }

  const handleExport = () => {
    console.log("Exporting analytics data...")
    // In a real app, generate and download CSV/PDF
  }

  // Empty stats
  const totalSpent = 0
  const totalBudget = 0
  const avgDailySpending = 0

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Detailed insights into your spending patterns and trends
        </p>
      </div>

      {/* Filters */}
      <AnalyticsFilters
        onDateRangeChange={handleDateRangeChange}
        onCategoryFilter={handleCategoryFilter}
        onExport={handleExport}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">No data available yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Usage</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">Set up budgets to track usage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{avgDailySpending.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Start adding expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">No categories yet</p>
          </CardContent>
        </Card>
      </div>

      {/* Empty State for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
            <CardDescription>Monthly spending vs budget over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No spending data</h3>
              <p className="text-gray-500 dark:text-gray-400">Add expenses to see spending trends</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Spending distribution by category this month</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🥧</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No categories</h3>
              <p className="text-gray-500 dark:text-gray-400">Start categorizing your expenses</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Spending Pattern</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No daily data</h3>
              <p className="text-gray-500 dark:text-gray-400">Track daily expenses to see patterns</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Progress</CardTitle>
            <CardDescription>Track your budget goals</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No budgets set</h3>
              <p className="text-gray-500 dark:text-gray-400">Create budgets to track progress</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Get Started with Analytics</CardTitle>
          <CardDescription>Follow these steps to unlock powerful insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl mb-2">1️⃣</div>
              <h4 className="font-medium mb-1">Add Expenses</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Start by adding your daily expenses with categories
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl mb-2">2️⃣</div>
              <h4 className="font-medium mb-1">Set Budgets</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create monthly budgets for different categories
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl mb-2">3️⃣</div>
              <h4 className="font-medium mb-1">Get Insights</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View detailed analytics and AI-powered recommendations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

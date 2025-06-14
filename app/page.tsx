"use client"

import { useState } from "react"
import { ExpenseCard } from "@/components/expense-card"
import { SplineScene } from "@/components/spline-scene"
import { StatsCards } from "@/components/stats-cards"
import { ExpenseChatbot } from "@/components/chatbot/expense-chatbot"
import { ExcelExport } from "@/components/export/excel-export"
import { Plus, BarChart3 } from "lucide-react"
import Link from "next/link"

// Empty data - no dummy data as requested
const emptyExpenses: any[] = []

const emptyStats = {
  todaySpent: 0,
  monthlySpent: 0,
  monthlyBudget: 0,
  savingsThisMonth: 0,
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState(emptyExpenses)

  const handleEdit = (id: number) => {
    console.log("Edit expense:", id)
  }

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Expense Tracker</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">AI-powered expense tracking with 3D visualization</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/analytics"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Expense
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCards stats={emptyStats} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3D Expense Visualization</h2>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <SplineScene
                scene="https://prod.spline.design/expense-tracker-scene/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Expenses</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {expenses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💰</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No expenses yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Start tracking your expenses to see insights and analytics
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add Your First Expense
                  </button>
                </div>
              ) : (
                expenses.map((expense) => (
                  <ExpenseCard key={expense.id} expense={expense} onEdit={handleEdit} onDelete={handleDelete} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="mt-8">
          <ExcelExport />
        </div>

        {/* Getting Started Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Assistant</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Chat with our AI to add expenses, get insights, and manage your budget using natural language
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Get detailed insights into your spending patterns with AI-powered analysis and recommendations
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export & Share</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Export your data to Excel with detailed analysis and share reports with your financial advisor
            </p>
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      <ExpenseChatbot />
    </div>
  )
}

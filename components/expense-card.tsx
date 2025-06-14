"use client"

import { Trash2, Edit3, Calendar, Tag } from "lucide-react"

interface ExpenseCardProps {
  expense: {
    id: number
    amount: number
    description: string
    category: { name: string; icon: string; color: string }
    transaction_date: string
  }
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export const ExpenseCard = ({ expense, onEdit, onDelete }: ExpenseCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: expense.category.color }}
        >
          <span className="text-lg">{expense.category.icon}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {expense.description || expense.category.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(expense.transaction_date)}</span>
            <Tag className="w-4 h-4" />
            <span>{expense.category.name}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="font-bold text-lg text-gray-900 dark:text-white">{formatCurrency(expense.amount)}</span>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(expense.id)}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
)

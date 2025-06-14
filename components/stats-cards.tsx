import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react"

interface StatsCardsProps {
  stats: {
    todaySpent: number
    monthlySpent: number
    monthlyBudget: number
    savingsThisMonth: number
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const budgetUsedPercentage = stats.monthlyBudget > 0 ? (stats.monthlySpent / stats.monthlyBudget) * 100 : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Today's Spending */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.todaySpent)}</p>
          </div>
        </div>
      </div>

      {/* Monthly Spending vs Budget */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Budget</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.monthlySpent)}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full ${
                  budgetUsedPercentage > 100
                    ? "bg-red-500"
                    : budgetUsedPercentage > 80
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${Math.min(budgetUsedPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {budgetUsedPercentage.toFixed(1)}% of {formatCurrency(stats.monthlyBudget)}
            </p>
          </div>
        </div>
      </div>

      {/* Savings This Month */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Savings</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.savingsThisMonth)}</p>
          </div>
        </div>
      </div>

      {/* Budget Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${
              budgetUsedPercentage > 100 ? "bg-red-100 dark:bg-red-900/20" : "bg-blue-100 dark:bg-blue-900/20"
            }`}
          >
            {budgetUsedPercentage > 100 ? (
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
            ) : (
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
            <p className={`text-lg font-bold ${budgetUsedPercentage > 100 ? "text-red-600" : "text-green-600"}`}>
              {budgetUsedPercentage > 100 ? "Over Budget" : "On Track"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

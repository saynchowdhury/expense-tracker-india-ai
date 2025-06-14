"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Filter, Download } from "lucide-react"

interface AnalyticsFiltersProps {
  onDateRangeChange: (range: { from: string; to: string }) => void
  onCategoryFilter: (categories: string[]) => void
  onExport: () => void
}

export function AnalyticsFilters({ onDateRangeChange, onCategoryFilter, onExport }: AnalyticsFiltersProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const periods = [
    { value: "week", label: "Last 7 days" },
    { value: "month", label: "Last 30 days" },
    { value: "quarter", label: "Last 3 months" },
    { value: "year", label: "Last 12 months" },
  ]

  const categories = [
    { value: "food", label: "Food", icon: "🍕" },
    { value: "transport", label: "Transport", icon: "🚗" },
    { value: "entertainment", label: "Entertainment", icon: "🎬" },
    { value: "shopping", label: "Shopping", icon: "🛍️" },
    { value: "bills", label: "Bills", icon: "📄" },
    { value: "health", label: "Health", icon: "🏥" },
  ]

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period)
    const now = new Date()
    const from = new Date()

    switch (period) {
      case "week":
        from.setDate(now.getDate() - 7)
        break
      case "month":
        from.setDate(now.getDate() - 30)
        break
      case "quarter":
        from.setMonth(now.getMonth() - 3)
        break
      case "year":
        from.setFullYear(now.getFullYear() - 1)
        break
    }

    onDateRangeChange({
      from: from.toISOString().split("T")[0],
      to: now.toISOString().split("T")[0],
    })
  }

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(updated)
    onCategoryFilter(updated)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Time Period Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">Period:</span>
            <div className="flex gap-1">
              {periods.map((period) => (
                <Button
                  key={period.value}
                  variant={selectedPeriod === period.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePeriodChange(period.value)}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">Categories:</span>
            <div className="flex flex-wrap gap-1">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategories.includes(category.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryToggle(category.value)}
                  className="text-xs"
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <Button variant="outline" size="sm" onClick={onExport} className="ml-auto">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

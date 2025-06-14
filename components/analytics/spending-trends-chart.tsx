"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SpendingTrendsChartProps {
  data: Array<{
    date: string
    spending: number
    budget: number
    savings: number
  }>
}

export function SpendingTrendsChart({ data }: SpendingTrendsChartProps) {
  const chartConfig = {
    spending: {
      label: "Spending",
      color: "hsl(var(--chart-1))",
    },
    budget: {
      label: "Budget",
      color: "hsl(var(--chart-2))",
    },
    savings: {
      label: "Savings",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Trends</CardTitle>
        <CardDescription>Monthly spending vs budget over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 12 }} />
              <YAxis
                className="text-xs"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: number, name: string) => [`₹${value.toLocaleString()}`, name]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="spending"
                stroke="var(--color-spending)"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Spending"
              />
              <Line
                type="monotone"
                dataKey="budget"
                stroke="var(--color-budget)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                name="Budget"
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="var(--color-savings)"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Savings"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DailySpendingChartProps {
  data: Array<{
    date: string
    amount: number
    day: string
  }>
}

export function DailySpendingChart({ data }: DailySpendingChartProps) {
  const chartConfig = {
    amount: {
      label: "Daily Spending",
      color: "hsl(var(--chart-1))",
    },
  }

  const averageSpending = data.reduce((sum, item) => sum + item.amount, 0) / data.length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Spending Pattern</CardTitle>
        <CardDescription>Last 30 days • Average: ₹{averageSpending.toFixed(0)} per day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" className="text-xs" tick={{ fontSize: 10 }} />
              <YAxis className="text-xs" tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${value}`} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    return payload[0].payload.date
                  }
                  return label
                }}
              />
              <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

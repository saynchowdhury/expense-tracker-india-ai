import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { VercelAnalyticsDashboard } from "@/components/analytics/vercel-analytics-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="expense-analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Center</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Comprehensive insights for your expenses and application performance
              </p>
            </div>
            <TabsList className="grid w-fit grid-cols-2">
              <TabsTrigger value="expense-analytics">Expense Analytics</TabsTrigger>
              <TabsTrigger value="app-analytics">App Analytics</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="expense-analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="app-analytics" className="space-y-6">
            <VercelAnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

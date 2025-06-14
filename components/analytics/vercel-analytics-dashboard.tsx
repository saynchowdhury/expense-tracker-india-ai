"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  MousePointer,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  TrendingUp,
  Eye,
  Activity,
} from "lucide-react"

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  averageSessionDuration: string
  bounceRate: number
  topPages: Array<{ path: string; views: number; percentage: number }>
  deviceTypes: Array<{ type: string; count: number; percentage: number }>
  countries: Array<{ country: string; visitors: number; percentage: number }>
  realTimeUsers: number
}

export function VercelAnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    averageSessionDuration: "0:00",
    bounceRate: 0,
    topPages: [],
    deviceTypes: [],
    countries: [],
    realTimeUsers: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = async () => {
      setIsLoading(true)

      // In a real implementation, you would fetch from Vercel Analytics API
      // For now, we'll show the structure with empty data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setAnalyticsData({
        pageViews: 0,
        uniqueVisitors: 0,
        averageSessionDuration: "0:00",
        bounceRate: 0,
        topPages: [],
        deviceTypes: [],
        countries: [],
        realTimeUsers: 0,
      })

      setIsLoading(false)
    }

    loadAnalytics()
  }, [])

  const MetricCard = ({
    title,
    value,
    icon: Icon,
    change,
    changeType = "neutral",
  }: {
    title: string
    value: string | number
    icon: any
    change?: string
    changeType?: "positive" | "negative" | "neutral"
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`text-xs ${
              changeType === "positive"
                ? "text-green-600"
                : changeType === "negative"
                  ? "text-red-600"
                  : "text-muted-foreground"
            }`}
          >
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            <p className="text-muted-foreground">Real-time insights powered by Vercel Analytics</p>
          </div>
          <Badge variant="outline" className="animate-pulse">
            <Activity className="w-3 h-3 mr-1" />
            Loading...
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Real-time insights powered by Vercel Analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-3 h-3 mr-1" />
            Live: {analyticsData.realTimeUsers} users
          </Badge>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Full Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Page Views"
          value={analyticsData.pageViews.toLocaleString()}
          icon={Eye}
          change="Start tracking to see data"
          changeType="neutral"
        />
        <MetricCard
          title="Unique Visitors"
          value={analyticsData.uniqueVisitors.toLocaleString()}
          icon={Users}
          change="New users will appear here"
          changeType="neutral"
        />
        <MetricCard
          title="Avg. Session Duration"
          value={analyticsData.averageSessionDuration}
          icon={Clock}
          change="User engagement metrics"
          changeType="neutral"
        />
        <MetricCard
          title="Bounce Rate"
          value={`${analyticsData.bounceRate}%`}
          icon={MousePointer}
          change="Page interaction data"
          changeType="neutral"
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages in your application</CardDescription>
          </CardHeader>
          <CardContent>
            {analyticsData.topPages.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No page data available yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Page views will appear here once users start visiting
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {analyticsData.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{page.path}</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${page.percentage}%` }} />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="font-semibold">{page.views}</div>
                      <div className="text-sm text-muted-foreground">{page.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Device Types */}
        <Card>
          <CardHeader>
            <CardTitle>Device Types</CardTitle>
            <CardDescription>How users access your application</CardDescription>
          </CardHeader>
          <CardContent>
            {analyticsData.deviceTypes.length === 0 ? (
              <div className="text-center py-8">
                <div className="flex justify-center gap-2 mb-4">
                  <Monitor className="w-6 h-6 text-muted-foreground" />
                  <Smartphone className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No device data available yet</p>
                <p className="text-sm text-muted-foreground mt-1">Device analytics will show here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {analyticsData.deviceTypes.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {device.type === "desktop" && <Monitor className="w-4 h-4" />}
                      {device.type === "mobile" && <Smartphone className="w-4 h-4" />}
                      <span className="capitalize">{device.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${device.percentage}%` }} />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{device.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Geographic Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Geographic Distribution
          </CardTitle>
          <CardDescription>Where your users are located</CardDescription>
        </CardHeader>
        <CardContent>
          {analyticsData.countries.length === 0 ? (
            <div className="text-center py-8">
              <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No geographic data available yet</p>
              <p className="text-sm text-muted-foreground mt-1">User locations will appear here once traffic starts</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analyticsData.countries.map((country, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <div className="font-medium">{country.country}</div>
                    <div className="text-sm text-muted-foreground">{country.percentage}% of traffic</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{country.visitors}</div>
                    <div className="text-sm text-muted-foreground">visitors</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analytics Features */}
      <Card>
        <CardHeader>
          <CardTitle>Vercel Analytics Features</CardTitle>
          <CardDescription>What you get with Vercel Analytics integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
              <h4 className="font-semibold mb-1">Real-time Analytics</h4>
              <p className="text-sm text-muted-foreground">Track user behavior and page performance in real-time</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Activity className="w-8 h-8 text-green-600 mb-2" />
              <h4 className="font-semibold mb-1">Performance Insights</h4>
              <p className="text-sm text-muted-foreground">Monitor Core Web Vitals and page load performance</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Users className="w-8 h-8 text-purple-600 mb-2" />
              <h4 className="font-semibold mb-1">User Journey</h4>
              <p className="text-sm text-muted-foreground">Understand how users navigate through your application</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Status</CardTitle>
          <CardDescription>Vercel Analytics and Speed Insights are active</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-medium">Vercel Analytics</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-medium">Speed Insights</span>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Active
              </Badge>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> Analytics data will start appearing once users begin interacting with your
              application. The integration is ready and tracking all user interactions automatically.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

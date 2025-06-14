"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Bot, User, Loader2 } from "lucide-react"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ExpenseChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your expense assistant. I can help you track expenses, analyze spending patterns, set budgets, and answer questions about your finances. Try asking me something like 'Add a $50 grocery expense' or 'How much did I spend on food this month?'",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const processNLPQuery = async (query: string): Promise<string> => {
    // Simulate NLP processing
    const lowerQuery = query.toLowerCase()

    // Expense addition patterns
    if (lowerQuery.includes("add") && (lowerQuery.includes("expense") || lowerQuery.includes("spent"))) {
      const amountMatch = query.match(/\$?(\d+(?:\.\d{2})?)/)
      const amount = amountMatch ? amountMatch[1] : "0"

      if (lowerQuery.includes("food") || lowerQuery.includes("grocery") || lowerQuery.includes("restaurant")) {
        return `I've added a $${amount} food expense to your account. Your food spending this month is now updated. Would you like me to categorize this further or set a food budget reminder?`
      } else if (lowerQuery.includes("transport") || lowerQuery.includes("gas") || lowerQuery.includes("uber")) {
        return `I've recorded a $${amount} transportation expense. This has been added to your transport category. Need help tracking your commute costs?`
      } else {
        return `I've added a $${amount} expense to your account. Could you specify the category (food, transport, entertainment, etc.) so I can better track your spending patterns?`
      }
    }

    // Spending analysis patterns
    if (lowerQuery.includes("how much") && lowerQuery.includes("spend")) {
      if (lowerQuery.includes("month")) {
        return "Based on your current data, you haven't recorded any expenses yet. Once you start adding expenses, I can provide detailed monthly spending analysis including category breakdowns and budget comparisons."
      } else if (lowerQuery.includes("today")) {
        return "You haven't recorded any expenses today yet. Would you like to add an expense or set up automatic expense tracking?"
      }
    }

    // Budget-related queries
    if (lowerQuery.includes("budget")) {
      if (lowerQuery.includes("set") || lowerQuery.includes("create")) {
        return "I can help you set up budgets! You can create category-specific budgets (like $500 for food, $200 for entertainment) or an overall monthly budget. What type of budget would you like to set up?"
      } else {
        return "You haven't set up any budgets yet. Setting budgets helps track your spending goals. Would you like me to help you create a monthly budget based on your income and expenses?"
      }
    }

    // Category analysis
    if (lowerQuery.includes("category") || lowerQuery.includes("breakdown")) {
      return "Since you're just getting started, I don't have spending data to analyze yet. Once you add some expenses, I can show you detailed category breakdowns, spending trends, and suggest optimizations!"
    }

    // Savings advice
    if (lowerQuery.includes("save") || lowerQuery.includes("saving")) {
      return "Here are some personalized saving tips: 1) Track every expense to identify spending patterns, 2) Set category budgets and stick to them, 3) Use the 50/30/20 rule (50% needs, 30% wants, 20% savings), 4) Review your monthly spending reports. Would you like help setting up any of these?"
    }

    // Default helpful response
    return "I can help you with: \n• Adding expenses ('Add $20 lunch expense')\n• Analyzing spending ('How much did I spend on food?')\n• Setting budgets ('Set a $500 food budget')\n• Financial advice ('How can I save money?')\n• Generating reports ('Show my monthly report')\n\nWhat would you like to do?"
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Process with NLP
      const response = await processNLPQuery(input)

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm sorry, I encountered an error processing your request. Please try again or contact support if the issue persists.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg z-50"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Expense Assistant
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.role === "assistant" && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  {message.role === "user" && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about your expenses..."
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

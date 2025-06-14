"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"

// Mock Spline component for demonstration
// In production, replace with: import Spline from "@splinetool/react-spline"
const MockSpline = ({ scene, className, onLoad, onError }: any) => {
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      if (Math.random() > 0.3) {
        // 70% success rate
        onLoad?.()
      } else {
        onError?.(new Error("Mock loading error"))
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [scene, onLoad, onError])

  return (
    <div
      className={`bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        <div className="text-6xl mb-4">💰</div>
        <p className="text-gray-600 dark:text-gray-300">3D Expense Visualization</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Scene: {scene.split("/").pop()}</p>
      </div>
    </div>
  )
}

interface SplineSceneProps {
  scene: string
  className?: string
  fallbackClassName?: string
}

export function SplineScene({ scene, className = "", fallbackClassName = "w-full h-full" }: SplineSceneProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [key, setKey] = useState(0)
  const splineRef = useRef(null)
  const attemptRef = useRef(0)
  const maxAttempts = 3

  useEffect(() => {
    setLoading(true)
    setError(null)
    attemptRef.current = 0
    setKey((prev) => prev + 1)
  }, [scene])

  const handleSplineLoad = () => {
    console.log("Spline scene loaded successfully")
    setLoading(false)
    setError(null)
  }

  const handleSplineError = (err: any) => {
    console.error("Spline scene error:", err)

    if (attemptRef.current < maxAttempts) {
      attemptRef.current += 1
      console.log(`Retrying (${attemptRef.current}/${maxAttempts})...`)

      setTimeout(() => {
        setKey((prev) => prev + 1)
      }, 1500)
    } else {
      setError("Failed to load 3D scene. Please check your connection and try again.")
      setLoading(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {error ? (
        <div className={`flex flex-col items-center justify-center bg-muted/20 rounded-lg ${fallbackClassName}`}>
          <p className="text-destructive mb-2">{error}</p>
          <button
            onClick={() => {
              attemptRef.current = 0
              setLoading(true)
              setError(null)
              setKey((prev) => prev + 1)
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {loading && (
            <div
              className={`absolute inset-0 z-10 flex items-center justify-center bg-muted/20 rounded-lg ${fallbackClassName}`}
            >
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <span className="text-sm text-muted-foreground">
                  Loading 3D scene{attemptRef.current > 0 ? ` (Attempt ${attemptRef.current}/${maxAttempts})` : ""}
                </span>
              </div>
            </div>
          )}

          <div key={key} className={loading ? "opacity-0" : "opacity-100"}>
            <MockSpline
              ref={splineRef}
              scene={scene}
              className={className}
              onLoad={handleSplineLoad}
              onError={handleSplineError}
            />
          </div>
        </>
      )}
    </div>
  )
}

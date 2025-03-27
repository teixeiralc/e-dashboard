'use client'

import type React from 'react'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface LoadingScreenProps {
  isLoading?: boolean
  className?: string
  text?: string
  textClassName?: string
  showProgress?: boolean
  progress?: number
}

export default function LoadingScreen({
  isLoading = true,
  className,
  text = 'Carregando',
  textClassName,
}: LoadingScreenProps) {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShow(true), 300)
      return () => clearTimeout(timer)
    } else {
      setShow(false)
    }
  }, [isLoading])

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!show) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center',
        'bg-black/70 backdrop-blur-md transition-all duration-500',
        mounted ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated circles */}
        <div className="absolute left-1/4 top-1/4 h-32 w-32 animate-pulse rounded-full bg-teal-600/10 blur-xl" />
        <div
          className="absolute bottom-1/4 right-1/4 h-40 w-40 animate-pulse rounded-full bg-teal-600/5 blur-xl"
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-teal-600/15 blur-xl"
          style={{ animationDelay: '1s' }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid h-full w-full grid-cols-12 grid-rows-12">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="border border-white/5"
                style={{
                  opacity: Math.random() * 0.5 + 0.25,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main loading container */}
      <div className="relative flex flex-col items-center justify-center gap-6 rounded-xl bg-zinc-900/40 p-10 shadow-2xl backdrop-blur-lg">
        <div>
          <Loader2 className={cn('animate-spin text-teal-800')} size={40} />
        </div>

        {/* Text with typing animation */}
        {text && (
          <div className="overflow-hidden">
            <p className={cn('text-xl font-medium text-zinc-100', 'animate-pulse', textClassName)}>
              {text}
              <span className="ml-1 inline-block animate-bounce">.</span>
              <span className="ml-0.5 inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>
                .
              </span>
              <span className="ml-0.5 inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>
                .
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

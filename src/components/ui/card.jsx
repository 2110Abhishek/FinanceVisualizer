'use client'
import { cn } from '@/lib/utils'

export function Card({ children, className }) {
  return (
    <div className={cn(
      "rounded-xl border bg-background p-5 shadow-lg dark:bg-gray-900",
      className
    )}>
      {children}
    </div>
  )
}

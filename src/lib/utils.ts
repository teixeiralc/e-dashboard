import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(number: number): string {
  if (number >= 1000) {
    const valueInThousands = number / 1000
    return `${valueInThousands.toFixed(1)}K`
  }

  if (number >= 1000000) {
    const valueInThousands = number / 1000000
    return `${valueInThousands.toFixed(1)}KK`
  }

  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)
}

export function daysUntilTargetDate(targetDateStr: string): number {
  const targetDate = new Date(targetDateStr)
  const currentDate = new Date()

  targetDate.setHours(0, 0, 0, 0)
  currentDate.setHours(0, 0, 0, 0)

  const diffTime = targetDate.getTime() - currentDate.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

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

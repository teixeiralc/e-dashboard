import { cn } from '@/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

type TCardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
  children?: ReactNode
  title?: string
}

export default function BaseCard({ className, children, title = '', ...props }: TCardProps) {
  return (
    <div className={cn(`bg-white w-full rounded-2xl drop-shadow-md p-8`, className)} {...props}>
      {title && <h1 className="text-5xl tracking-tighter drop-shadow-lg font-title text-zinc-900">{title}</h1>}
      {children}
    </div>
  )
}

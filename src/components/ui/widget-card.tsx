import { cn } from '@/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

type TCardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
  legend?: string
  statusColor?: 'success' | 'error' | 'warning'
  children?: ReactNode
}

export default function WidgetCard({ className, children = '', legend, statusColor, ...props }: TCardProps) {
  statusColor = 'bg-' + statusColor

  return (
    <div
      className={cn(
        `w-full rounded-2xl drop-shadow-2xl ${legend ? 'px-6 py-8' : 'p-6'} text-zinc-900 border border-zinc-400 `,
        className,
      )}
      {...props}
    >
      {children}
      {legend && (
        <div className="absolute right-2 bottom-2 flex items-center justify-center gap-1">
          <div className={`h-1.5 w-1.5 rounded-full ${statusColor}`} />
          <h3 className="font-data text-zinc-900 uppercase text-mono tracking-tight ">{legend}</h3>
        </div>
      )}
    </div>
  )
}

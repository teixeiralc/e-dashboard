import { HTMLAttributes, ReactNode } from 'react'

type TCardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
  children?: ReactNode
}

export default function WidgetCard({ className, children = '', ...props }: TCardProps) {
  return (
    <div
      className={`bg-linear-to-b from-prim-3 to-prim-1 w-full rounded-2xl drop-shadow-2xl p-8 text-base-5 ${className} max-w-72`}
      {...props}
    >
      {children}
    </div>
  )
}

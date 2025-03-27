'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const DialogContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>({
  open: false,
  onOpenChange: () => {},
})

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return <DialogContext.Provider value={{ open, onOpenChange }}>{children}</DialogContext.Provider>
}

type DialogTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  children: React.ReactNode
}

export function DialogTrigger({ children, asChild = false, ...props }: DialogTriggerProps) {
  const { onOpenChange } = React.useContext(DialogContext)

  if (asChild && React.isValidElement(children)) {
    const childElement = children as React.ReactElement<{
      onClick?: (e: React.MouseEvent<HTMLElement>) => void
    }>

    return React.cloneElement(childElement, {
      ...childElement.props,
      ...props,
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        if (childElement.props.onClick) {
          childElement.props.onClick(e)
        }
        onOpenChange(true)
      },
    })
  }

  return (
    <button type="button" onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  )
}

export function DialogContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open, onOpenChange } = React.useContext(DialogContext)
  const ref = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(false)
  const [portalElement, setPortalElement] = React.useState<HTMLElement | null>(null)
  const [animationState, setAnimationState] = React.useState<'open' | 'closed'>('closed')

  // Set up portal element
  React.useEffect(() => {
    setPortalElement(document.body)
  }, [])

  // Handle animation states
  React.useEffect(() => {
    if (open) {
      setMounted(true)
      // Small delay to ensure the DOM is ready for the animation
      const timer = setTimeout(() => {
        setAnimationState('open')
      }, 10)
      return () => clearTimeout(timer)
    } else {
      setAnimationState('closed')
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setMounted(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onOpenChange])

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open, onOpenChange])

  // Prevent body scrolling when dialog is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!mounted || !portalElement) return null

  // Use createPortal to render directly to body
  return createPortal(
    <div
      className="dialog-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0)',
      }}
    >
      {/* Overlay with animation - exactly matching shadcn's fade-in-0 animation */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          opacity: animationState === 'open' ? 1 : 0,
          transition: 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 9999,
        }}
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog content with animation - exactly matching shadcn's animations */}
      <div
        ref={ref}
        className={cn('bg-background p-6 border shadow-lg sm:rounded-lg w-full max-w-lg', className)}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          // Exactly match shadcn's slide-in-from-left-1/2 and slide-in-from-top-[48%] animations
          transform: `translate(
            ${animationState === 'open' ? '-50%' : 'calc(-50% - 1rem)'}, 
            ${animationState === 'open' ? '-50%' : 'calc(-50% - 1rem)'}
          ) 
          scale(${animationState === 'open' ? 1 : 0.95})`,
          opacity: animationState === 'open' ? 1 : 0,
          // Match shadcn's animation duration (300ms)
          transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 10000,
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
        {...props}
      >
        {children}
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => onOpenChange(false)}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>,
    portalElement,
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}

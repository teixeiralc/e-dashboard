import type { Metadata } from 'next'
import './globals.css'
import { ibmPlexMono, montserrat, spaceGrotesk } from './utils/fonts'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'e-Dashboard',
  description: 'Um dashboard para a sua loja virtual.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        suppressHydrationWarning
        className={`${ibmPlexMono.variable} ${spaceGrotesk.variable} ${montserrat.variable} bg-prim-4 antialiased`}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}

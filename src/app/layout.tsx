import type { Metadata } from 'next'
import './globals.css'
import { ibmPlexMono, montserrat, spaceGrotesk } from './utils/fonts'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-providers'

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${ibmPlexMono.variable} ${spaceGrotesk.variable} ${montserrat.variable} bg-zinc-800 antialiased container`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}

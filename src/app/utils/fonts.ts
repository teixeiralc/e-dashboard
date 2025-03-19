import { IBM_Plex_Mono, Montserrat, Space_Grotesk } from 'next/font/google'

export const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-data',
  weight: ['400', '700'],
  fallback: ['monospace'],
  subsets: ['latin'],
  style: ['normal'],
})

export const spaceGrotesk = Space_Grotesk({
  variable: '--font-title',
  weight: ['700'],
  fallback: ['sans-serif'],
  subsets: ['latin'],
  style: ['normal'],
})

export const montserrat = Montserrat({
  variable: '--font-body',
  weight: ['400', '700'],
  fallback: ['sans-serif'],
  subsets: ['latin'],
  style: ['normal'],
})

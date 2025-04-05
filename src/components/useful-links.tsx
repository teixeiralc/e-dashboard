'use client'

import { saveAs } from 'file-saver'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { Download, Github, Linkedin } from 'lucide-react'

export default function UsefulLinks() {
  async function downloadDocumentationPdf() {
    const response = await fetch('/files/Documentação-do-projeto.pdf')
    const blob = await response.blob()
    saveAs(blob, 'Documentação do projeto.pdf')
  }

  async function downloadScopePdf() {
    const response = await fetch('/files/Escopo-do-projeto.pdf')
    const blob = await response.blob()
    saveAs(blob, 'Escopo do projeto.pdf')
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <Link
        href={`https://www.linkedin.com/in/lucascteixeira0/`}
        target="_blank"
        className={cn('bg-[#0a66c2] text-white', buttonVariants({ variant: 'ghost' }))}
      >
        <Linkedin />
        LinkedIn
      </Link>
      <Link
        href={`https://github.com/teixeiralc/e-comm-dashboard`}
        target="_blank"
        className={cn('bg-zinc-900 text-white', buttonVariants({ variant: 'ghost' }))}
      >
        <Github />
        GitHub
      </Link>
      <Button
        className="bg-teal-700 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
        onClick={downloadDocumentationPdf}
      >
        <Download /> Documentação
      </Button>
      <Button
        className="bg-rose-700 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
        onClick={downloadScopePdf}
      >
        <Download /> Escopo
      </Button>
    </div>
  )
}

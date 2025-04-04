'use client'

import { saveAs } from 'file-saver'

import BaseCard from '@/components/ui/base-card'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Download, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function InformacoesPage() {
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
    <main>
      <BaseCard className="mt-8">
        <div className="max-w-3xl">
          <h1 className="text-5xl text-zinc-900 font-bold uppercase font-title drop-shadow-md mb-8">Informações</h1>
          <h2 className="text-2xl text-zinc-900 font-bold uppercase font-title drop-shadow-md mb-2">Sobre o projeto</h2>
          <p className="text-zinc-700 tracking-tight  mb-8">
            Este projeto é um painel administrativo de e-commerce desenvolvido com <b>Next.js 15</b>, <b>React</b>,
            <b>Tailwind CSS</b>, <b>ShadCN</b> e <b>Supabase</b>.
            <br />
            Ele permite que usuários gerenciem produtos, pedidos e visualizem estatísticas de sua loja virtual.
          </p>
          <h2 className="text-2xl text-zinc-900 font-bold uppercase font-title drop-shadow-md mb-2">
            Funcionalidades Principais
          </h2>
          <ul className="space-y-1 text-zinc-700  mb-8">
            <li className="flex items-start">
              <p className="font-medium">
                Autenticação: <span className="font-normal">Login, cadastro e reset de senha via Supabase Auth.</span>
              </p>
            </li>
            <li className="flex items-start">
              <p className="font-medium">
                Gestão de Produtos:{' '}
                <span className="font-normal">Visualização, criação, edição e remoção de produtos.</span>
              </p>
            </li>
            <li className="flex items-start">
              <p className="font-medium">
                Gerenciamento de Pedidos: <span className="font-normal">Visualização e controle de pedidos.</span>
              </p>
            </li>
            <li className="flex items-start">
              <p className="font-medium">
                Estatísticas: <span className="font-normal">Gráfico sobre vendas.</span>
              </p>
            </li>
          </ul>
          <h2 className="text-2xl text-zinc-900 font-bold uppercase font-title drop-shadow-md mb-4">Links Úteis</h2>
          <div className="flex items-center gap-2">
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
        </div>
      </BaseCard>
    </main>
  )
}

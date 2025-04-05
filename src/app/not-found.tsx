import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="flex flex-col items-center gap-4">
        <AlertTriangle className="w-16 h-16 text-teal-400" />
        <h1 className="text-4xl font-bold text-white">Página não encontrada</h1>
        <p className="text-zinc-200 max-w-md">
          A página que você está procurando não existe ou foi removida. Verifique o endereço ou volte para o início.
        </p>
        <Link href="/dashboard">
          <Button variant="default" className="mt-4 bg-zinc-100 text-zinc-900 hover:text-teal-400">
            Voltar ao Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

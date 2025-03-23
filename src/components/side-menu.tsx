'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import DashboardIcon from './ui/svg-icons/dashboard-icon'
import EstatisticasIcon from './ui/svg-icons/estatisticas-icon'
import ProdutosIcon from './ui/svg-icons/produtos-icon'
import SairIcon from './ui/svg-icons/sair-icon'
import SettingsIcon from './ui/svg-icons/settings-icon'
import VendaIcon from './ui/svg-icons/venda-icon'
import { usePathname } from 'next/navigation'
import { logout } from '@/actions/logout'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function SideMenu() {
  const pathname = usePathname()

  async function handleLogout() {
    const { error } = await logout()

    if (error)
      toast.error('Ocorreu um erro inesperado.', {
        description: error,
      })
  }

  return (
    <section className="container">
      <div className="mt-8 bg-zinc-100 p-8 rounded-2xl flex flex-col h-[calc(100vh-4rem)] drop-shadow-2xl">
        <div className="self-center">
          <h1 className="font-title text-zinc-900 text-4xl drop-shadow-md">e-Dashboard</h1>
        </div>
        <Separator className="my-4 drop-shadow-md bg-zinc-300" />
        <nav className="flex-[1]">
          <ul className="flex flex-col items-start gap-4">
            <li>
              <Link
                href={'/dashboard'}
                className={cn(
                  `flex items-center gap-3 font-body text-2xl tracking-tight text-zinc-900 hover:text-teal-800`,
                  pathname === '/dashboard' && 'text-teal-800',
                )}
              >
                <DashboardIcon /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={'/dashboard/produtos'}
                className={cn(
                  `flex items-center gap-3 font-body text-2xl tracking-tight text-zinc-900 hover:text-teal-800`,
                  pathname.includes('/dashboard/produtos') && 'text-teal-800',
                )}
              >
                <ProdutosIcon /> Produtos
              </Link>
            </li>
            <li>
              <Link
                href={'/dashboard/vendas'}
                className={cn(
                  `flex items-center gap-3 font-body text-2xl tracking-tight text-zinc-900 hover:text-teal-800`,
                  pathname.includes('/dashboard/vendas') && 'text-teal-800',
                )}
              >
                <VendaIcon /> Vendas
              </Link>
            </li>
            <li>
              <Link
                href={'/dashboard/estatisticas'}
                className={cn(
                  `flex items-center gap-3 font-body text-2xl tracking-tight text-zinc-900 hover:text-teal-800`,
                  pathname.includes('/dashboard/estatisticas') && 'text-teal-800',
                )}
              >
                <EstatisticasIcon /> Estatísticas
              </Link>
            </li>
            <li>
              <Link
                href={'/dashboard/configurar'}
                className={cn(
                  `flex items-center gap-3 font-body text-2xl tracking-tight text-zinc-900 hover:text-teal-800`,
                  pathname.includes('/dashboard/configurar') && 'text-teal-800',
                )}
              >
                <SettingsIcon /> Configurações
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Separator className="my-4 drop-shadow-md bg-zinc-300" />
          <Button
            className="font-body text-2xl text-zinc-900 flex items-center hover:text-teal-800"
            variant={'ghost'}
            onClick={handleLogout}
          >
            Sair <SairIcon />
          </Button>
        </div>
      </div>
    </section>
  )
}

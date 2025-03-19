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
      <div className="mt-8 bg-base-1 p-8 rounded-2xl flex flex-col h-[calc(100vh-4rem)]">
        <div className="self-center">
          <h1 className="font-title color-base-5 text-4xl drop-shadow-md">e-Dashboard</h1>
        </div>
        <Separator className="my-4 drop-shadow-md" />
        <nav className="flex-[1]">
          <ul className="flex flex-col items-start gap-4">
            <li>
              <Link
                href={'/dashboard'}
                className={`flex items-center gap-3 font-body text-2xl tracking-tight text-base-5 hover:text-prim-4 ${
                  pathname.endsWith('dashboard') && 'text-prim-4'
                }`}
              >
                <DashboardIcon /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={'/dashboard/produtos'}
                className={`flex items-center gap-3 font-body text-2xl tracking-tight text-base-5 hover:text-prim-4 ${
                  pathname.endsWith('produtos') && 'text-prim-4'
                }`}
              >
                <ProdutosIcon /> Produtos
              </Link>
            </li>
            <li>
              <Link
                href={'/dashboard/vendas'}
                className={`flex items-center gap-3 font-body text-2xl tracking-tight text-base-5 hover:text-prim-4 ${
                  pathname.endsWith('vendas') && 'text-prim-4'
                }`}
              >
                <VendaIcon /> Vendas
              </Link>
            </li>
            <li>
              <Link
                href={'/dashboard/estatisticas'}
                className={`flex items-center gap-3 font-body text-2xl tracking-tight text-base-5 hover:text-prim-4 ${
                  pathname.endsWith('estatisticas') && 'text-prim-4'
                }`}
              >
                <EstatisticasIcon /> Estatísticas
              </Link>
            </li>
            <li>
              <Link
                href={'/dashboard/configurar'}
                className={`flex items-center gap-3 font-body text-2xl tracking-tight text-base-5 hover:text-prim-4 ${
                  pathname.endsWith('configurar') && 'text-prim-4'
                }`}
              >
                <SettingsIcon /> Configurações
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Separator className="my-4 drop-shadow-md" />
          <Button
            className="font-body text-2xl text-base-5 flex items-center hover:text-prim-4"
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

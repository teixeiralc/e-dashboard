'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import SairIcon from './ui/svg-icons/sair-icon'
import { usePathname } from 'next/navigation'
import { logout } from '@/actions/logout'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { ChartArea, CircleDollarSign, Info, LayoutDashboard, PackageSearch } from 'lucide-react'

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
    <section className="md:sticky md:top-0 md:h-screen">
      <div className="mt-4 sm:mt-8 bg-white p-4 lg:p-8 rounded-2xl flex flex-col md:h-[calc(100vh-4rem)] drop-shadow-2xl">
        <div className="self-center">
          <h1 className="font-title text-zinc-900 text-2xl lg:text-3xl drop-shadow-md">e-Dashboard</h1>
        </div>
        <Separator className="my-4 drop-shadow-md bg-zinc-300" />
        <nav className="flex-[1]">
          <ul className="flex flex-col items-start gap-2 sm:gap-4 text-lg lg:text-2xl">
            <li className="w-full">
              <Link
                href={'/dashboard'}
                className={cn(
                  `flex items-center gap-2 lg:gap-3 font-body tracking-tight text-zinc-900 hover:text-teal-800`,
                  pathname === '/dashboard' && 'text-teal-800',
                )}
              >
                <LayoutDashboard className="h-5 w-5 lg:h-6 lg:w-6" /> Dashboard
              </Link>
            </li>
            <li className="w-full">
              <Link
                href={'/dashboard/produtos'}
                className={cn(
                  `flex items-center gap-2 lg:gap-3 font-body tracking-tight text-zinc-900 hover:text-teal-800`,
                  pathname.includes('/dashboard/produtos') && 'text-teal-800',
                )}
              >
                <PackageSearch className="h-5 w-5 lg:h-6 lg:w-6" /> Produtos
              </Link>
            </li>
            <li className="w-full">
              <Link
                href={'/dashboard/vendas'}
                className={cn(
                  `flex items-center gap-2 lg:gap-3 font-body tracking-tight text-zinc-900 hover:text-teal-800`,
                  pathname.includes('/dashboard/vendas') && 'text-teal-800',
                )}
              >
                <CircleDollarSign className="h-5 w-5 lg:h-6 lg:w-6" /> Vendas
              </Link>
            </li>
            <li className="w-full">
              <Link
                href={'/dashboard/estatisticas'}
                className={cn(
                  `flex items-center gap-2 lg:gap-3 font-body tracking-tight text-zinc-900 hover:text-teal-800`,
                  pathname.includes('/dashboard/estatisticas') && 'text-teal-800',
                )}
              >
                <ChartArea className="h-5 w-5 lg:h-6 lg:w-6" /> Estatísticas
              </Link>
            </li>
            <li className="w-full">
              <Link
                href={'/dashboard/informacoes'}
                className={cn(
                  `flex items-center gap-2 lg:gap-3 font-body tracking-tight text-zinc-900 hover:text-teal-800`,
                  pathname.includes('/dashboard/informacoes') && 'text-teal-800',
                )}
              >
                <Info className="h-5 w-5 lg:h-6 lg:w-6" /> Informações
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Separator className="my-4 drop-shadow-md bg-zinc-300" />
          <Button
            className="font-body text-lg lg:text-2xl text-zinc-900 flex items-center hover:text-teal-800"
            variant={null}
            onClick={handleLogout}
          >
            Sair <SairIcon />
          </Button>
        </div>
      </div>
    </section>
  )
}

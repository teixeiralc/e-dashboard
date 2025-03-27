import Link from 'next/link'
import NovoProdutoIcon from '../ui/svg-icons/novo-produto-icon'
import WidgetCard from '../ui/widget-card'
import PlusIcon from '../ui/svg-icons/plus-icon'
import NovaVendaIcon from '../ui/svg-icons/nova-venda-icon'
import NovoPerfilIcon from '../ui/svg-icons/novo-perfil-icon'

export default function DashboardActions() {
  return (
    <WidgetCard className="flex items-center justify-evenly">
      <Link
        href={'/'}
        className="uppercase text-zinc-900 font-body text-xs flex flex-col items-center justify-center gap-2"
      >
        <div className="p-4 bg-teal-700 hover:bg-teal-900 ease-in-out duration-200 rounded-xl relative">
          <NovoProdutoIcon />
          <span className="absolute right-[0.3px] bottom-1">
            <PlusIcon />
          </span>
        </div>
        <div className="flex flex-col items-center">
          <p>Novo</p>
          <p>produto</p>
        </div>
      </Link>
      <Link
        href={'/'}
        className="uppercase text-zinc-900 font-body text-xs flex flex-col items-center justify-center gap-2"
      >
        <div className="p-4 bg-teal-700 hover:bg-teal-900 ease-in-out duration-200 rounded-xl relative">
          <NovaVendaIcon />
          <span className="absolute right-[0.3px] bottom-1">
            <PlusIcon />
          </span>
        </div>
        <div className="flex flex-col items-center">
          <p>nova</p>
          <p>venda</p>
        </div>
      </Link>
      <Link
        href={'/'}
        className="uppercase text-zinc-900 font-body text-xs flex flex-col items-center justify-center gap-2"
      >
        <div className="p-4 bg-teal-700 hover:bg-teal-900 ease-in-out duration-200 rounded-xl relative">
          <NovoPerfilIcon />
          <span className="absolute right-[0.3px] bottom-1">
            <PlusIcon />
          </span>
        </div>
        <div className="flex flex-col items-center">
          <p>Novo</p>
          <p>perfil</p>
        </div>
      </Link>
    </WidgetCard>
  )
}
